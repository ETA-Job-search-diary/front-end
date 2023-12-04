'use client';

import { useRouter } from 'next/navigation';
import TextArea from './TextArea';
import TextInput from './TextInput';
import { useState, MouseEvent, useEffect } from 'react';
import FormLabel from './FormLabel';
import { getPlatformFromLink } from '@/service/form';
import { useSession } from 'next-auth/react';
import { useToast } from '../ui/use-toast';
import { formatToISODateTime, getFormattedISODateTime } from '@/service/date';
import GridChips from '../list/GridChips';
import { ScheduleDataType, postSchedule } from '@/service/schedule';
import NewNavBar from '../navbar/NewNavBar';
import EditNavBar from '../navbar/EditNavBar';
import useScheduleList from '@/hook/scheduleList';
import { FormTypes, PlaceholderTypes } from '@/constants/form';
import CompanyForm from '../new/CompanyForm';
import DateTimeForm from '../new/DateTimeForm';
import LinkForm from '../new/LinkForm';

const TEXTAREA_MAX_LENGTH = 200;

const { date: currentDate, time: currentTime } = getFormattedISODateTime();

interface FormProps {
  originData?: {
    id: string;
    title: string;
    step: string;
    company: string;
    position: string;
    date: string;
    link: string;
    platform: string;
    memo: string;
  };
}

const Form = ({ originData }: FormProps) => {
  const { refresh, replace } = useRouter();
  const { toast } = useToast();

  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const { mutate, setEditSchedule } = useScheduleList([]);

  const [title, setTitle] = useState(originData?.title || '');
  const [step, setStep] = useState(originData?.step || '');
  const [company, setCompany] = useState(originData?.company || '');
  const [position, setPosition] = useState(originData?.position || '');
  const [date, setDate] = useState<string>(
    (originData && getFormattedISODateTime(originData.date).date) ||
      currentDate,
  );
  const [time, setTime] = useState<string>(
    (originData && getFormattedISODateTime(originData.date).time) ||
      currentTime,
  );
  const [link, setLink] = useState(
    (originData?.link !== ' ' && originData?.link) || '',
  );
  const [platform, setPlatform] = useState(originData?.platform || '');
  const [memo, setMemo] = useState(
    (originData?.memo !== ' ' && originData?.memo) || '',
  );

  const autoPlatform = getPlatformFromLink(link);

  const isReady =
    title.length > 0 &&
    step.length > 0 &&
    company.length > 0 &&
    position.length > 0 &&
    !!date &&
    !!time;

  const isEdit =
    (originData &&
      (originData.title !== title ||
        originData.step !== step ||
        originData.company !== company ||
        originData.position !== position)) ||
    originData?.date !== formatToISODateTime(date, time) ||
    originData.link.trim() !== link ||
    (originData.platform === null ? '' : originData.platform) !== platform ||
    originData.memo.trim() !== memo;

  const isLinkValid = (link: string) => {
    const regex = new RegExp(
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
    );
    return regex.test(link);
  };

  const handleChipClick = (value: string) => {
    if (step === value) {
      setStep('');
      return;
    }
    setStep(value);
  };

  const handleTokenValidationToast = () => {
    toast({
      title: '로그인이 만료되었어요. 다시 로그인해주세요',
    });
  };

  const handleSubmitValidationToast = () => {
    toast({
      title: '필수 항목을 입력해주세요',
    });
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!token) {
      handleTokenValidationToast();
      return;
    }
    if (!isReady) {
      handleSubmitValidationToast();
      return;
    }

    const stringDate = formatToISODateTime(date, time);
    const data = {
      title,
      step,
      company,
      position,
      date: stringDate,
      link: link || ' ',
      platform: platform || autoPlatform,
      memo: memo || ' ',
    };

    if (originData) {
      if (isEdit) editSchedule(originData.id, data, token);
      return replace(`/schedule/${originData.id}`);
    }
    newSchedule(data, token);
  };

  const editSchedule = async (
    id: string,
    data: ScheduleDataType,
    token: string,
  ) => {
    return setEditSchedule(id, data, token)
      .then(() => {
        replace(`/schedule/${id}`);
        refresh();
      })
      .catch((e) => console.error(e));
  };

  const newSchedule = async (data: ScheduleDataType, token: string) => {
    return postSchedule(data, token)
      .then(() => {
        replace('/list');
        mutate();
      })
      .catch((e) => console.error(e));
  };

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {originData ? (
        <EditNavBar active={isReady} onSubmit={handleSubmit} />
      ) : (
        <NewNavBar active={isReady} onSubmit={handleSubmit} />
      )}
      <form className="h-full flex flex-col gap-12 px-[22px] web:px-[28px] pb-8">
        {isClient && (
          <>
            <TextInput
              id="title"
              label={FormTypes.TITLE}
              value={title}
              placeholder={PlaceholderTypes.TITLE}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <FormLabel must id="step" label={FormTypes.STEP}>
              <GridChips checked={[step]} onClick={handleChipClick} />
            </FormLabel>
            <CompanyForm
              company={company}
              position={position}
              onChangeCompany={(e) => setCompany(e.currentTarget.value)}
              onChangePosition={(e) => setPosition(e.currentTarget.value)}
            />
            <DateTimeForm
              date={date}
              time={time}
              onChangeDateTime={(date, time) => {
                setDate(date);
                setTime(time);
              }}
            />
            <LinkForm
              link={link}
              platform={platform}
              autoPlatform={autoPlatform}
              isLinkValid={isLinkValid(link)}
              onChangeLink={(e) => setLink(e.currentTarget.value)}
              onChangePlatform={(e) => setPlatform(e.currentTarget.value)}
              onReset={() => {
                setLink('');
                setPlatform('');
              }}
            />
            <FormLabel must={false} id="memo" label={FormTypes.MEMO}>
              <TextArea
                id="memo"
                value={memo}
                placeholder={`${PlaceholderTypes.MEMO} (최대 ${TEXTAREA_MAX_LENGTH}자)`}
                maxLength={TEXTAREA_MAX_LENGTH}
                onChange={(e) => setMemo(e.currentTarget.value)}
              />
            </FormLabel>
          </>
        )}
      </form>
    </>
  );
};

export const formLabelStyle =
  'font-semibold w-max text-xs xs:text-xxs text-black900';
export const formTextStyle = 'text-form text-black900';
export const formPlaceholderStyle = 'text-black300';

export default Form;
