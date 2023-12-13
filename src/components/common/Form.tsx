'use client';

import { useRouter } from 'next/navigation';
import TextArea from './TextArea';
import { useState, MouseEvent, useEffect } from 'react';
import { ChangeEvent, ClipboardEvent } from 'react';
import FormLabel from './FormLabel';
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
import { TOAST_MESSAGE } from '@/constants/toast';
import { ScheduleDetailType } from '@/model/schedule';
import useCrawler from '@/hook/useCrawler';
import useSession from '@/hook/useSession';

const TEXTAREA_MAX_LENGTH = 200;

const { date: currentDate, time: currentTime } = getFormattedISODateTime();

interface FormProps {
  originData?: ScheduleDetailType;
}

const Form = ({ originData }: FormProps) => {
  const { refresh, replace } = useRouter();
  const { toast } = useToast();
  const { token } = useSession();
  const { mutate, setEditSchedule } = useScheduleList([]);
  const { isCrawling, crawlLink } = useCrawler();

  const [step, setStep] = useState(originData?.step || '');
  const [company, setCompany] = useState(originData?.company || '');
  const [position, setPosition] = useState(originData?.position || '');
  const [date, setDate] = useState<string>(
    getFormattedISODateTime(originData?.date).date || currentDate,
  );
  const [time, setTime] = useState<string>(
    getFormattedISODateTime(originData?.date).time || currentTime,
  );
  const [link, setLink] = useState(
    (originData?.link !== ' ' && originData?.link) || '',
  );
  const [platform, setPlatform] = useState(originData?.platform || '');
  const [memo, setMemo] = useState(
    (originData?.memo !== ' ' && originData?.memo) || '',
  );

  let isPasted = false;

  const isReady =
    step.length > 0 &&
    company.length > 0 &&
    position.length > 0 &&
    !!date &&
    !!time;

  const isEdit =
    (originData &&
      (originData.step !== step ||
        originData.company !== company ||
        originData.position !== position)) ||
    originData?.date !== formatToISODateTime(date, time) ||
    originData.link?.trim() !== link ||
    (originData.platform === null ? '' : originData.platform) !== platform ||
    originData.memo?.trim() !== memo;

  const isLinkValid = (link: string) => {
    const regex =
      /^(https?:\/\/)?([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?)$/;
    return regex.test(link);
  };

  const handleLinkChange = async ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (isPasted) {
      return;
    }
    if (isLinkValid(value)) {
      const { company, platform } = await crawlLink(value);
      setCompany(company);
      setPlatform(platform);
    }
    setLink(value);
  };

  const handlePasteLink = async ({
    clipboardData,
  }: ClipboardEvent<HTMLInputElement>) => {
    isPasted = true;
    const link = clipboardData.getData('text');
    const index = link.indexOf('http');
    const linkWithoutSpace = link.slice(index);

    if (!isLinkValid(linkWithoutSpace)) {
      isPasted = false;
      return;
    }

    const { company, platform } = await crawlLink(linkWithoutSpace);
    setLink(linkWithoutSpace);
    setCompany(company);
    setPlatform(platform);
    isPasted = false;
  };

  const handleChipClick = (value: string) => {
    if (step === value) {
      setStep('');
      return;
    }
    setStep(value);
  };

  const handleTokenValidationToast = () =>
    toast({
      title: TOAST_MESSAGE.TOKEN,
    });

  const handleSubmitValidationToast = () =>
    toast({
      title: TOAST_MESSAGE.VALIDATION_FORM,
    });

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
      title: ' ',
      step,
      company,
      position,
      date: stringDate,
      link: link || ' ',
      platform: platform,
      memo: memo || ' ',
    };

    if (originData) {
      if (isEdit) editSchedule(originData.id, data, token);
      replace(`/schedule/${originData.id}`);
      return;
    }
    newSchedule(data, token);
  };

  const editSchedule = async (
    id: string,
    data: ScheduleDataType,
    token: string,
  ) => {
    return setEditSchedule(id, data, token).then(() => {
      replace(`/schedule/${id}`);
      refresh();
    });
  };

  // TODO: (기획) api로 통신해서 id를 받아와서 상세화면으로 이동?
  const newSchedule = async (data: ScheduleDataType, token: string) => {
    return postSchedule(data, token).then(() => {
      replace('/list');
      mutate();
    });
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
      <form className="flex flex-col gap-12 px-[22px] pb-8 pt-16 web:px-[28px] web:pt-[70px]">
        {isClient && (
          <>
            <FormLabel must label={FormTypes.STEP}>
              <GridChips checked={[step]} onClick={handleChipClick} />
            </FormLabel>
            <LinkForm
              link={link}
              platform={platform}
              isLinkValid={isLinkValid(link)}
              onPaste={handlePasteLink}
              onChangeLink={handleLinkChange}
              onChangePlatform={(e) => setPlatform(e.currentTarget.value)}
              onReset={() => {
                setCompany('');
                setPosition('');
                setLink('');
                setPlatform('');
              }}
            />
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
