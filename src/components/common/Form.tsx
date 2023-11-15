'use client';

import { useRouter } from 'next/navigation';
import TextArea from './TextArea';
import TextInput from './TextInput';
import { useState, MouseEvent, useEffect } from 'react';
import Button from './Button';
import FormLabel from './FormLabel';
import { getPlatformFromLink } from '@/service/form';
import { useSession } from 'next-auth/react';
import { useToast } from '../ui/use-toast';
import {
  convertToDateTime,
  getFormatByDate,
  getFormatCurrentDateTime,
} from '@/service/date';
import GridChips from '../list/GridChips';
import DateTimePicker from './DateTimePicker';
import {
  ScheduleDataType,
  postSchedule,
  putSchedule,
} from '@/service/schedule';

const TEXTAREA_MAX_LENGTH = 200;

const today = new Date();
const currentDay = getFormatByDate(today);
const currentHour = today.getHours() + ':00';

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

// 임시저장
const Form = ({ originData }: FormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const [title, setTitle] = useState(originData?.title || '');
  const [step, setStep] = useState(originData?.step || '');
  const [company, setCompany] = useState(originData?.company || '');
  const [position, setPosition] = useState(originData?.position || '');
  const [date, setDate] = useState<string>(
    (originData && getFormatCurrentDateTime(originData.date).date) ||
      currentDay,
  );
  const [time, setTime] = useState<string>(
    (originData && getFormatCurrentDateTime(originData.date).time) ||
      currentHour,
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

  const handleSubmitValidationToast = () => {
    toast({
      title: '항목을 모두 입력해주세요',
    });
  };

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();

    if (!token) return; //TODO: 토큰 없을때
    if (!isReady) {
      handleSubmitValidationToast();
      return;
    }

    const stringDate = convertToDateTime(date, time);
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
      editSchedule(originData.id, data, token);
      return;
    }
    newSchedule(data, token);
  };

  const editSchedule = async (
    id: string,
    data: ScheduleDataType,
    token: string,
  ) => {
    return putSchedule(id, data, token)
      .then(() => router.refresh())
      .then(() => router.push(`/schedule/${id}`))
      .catch((e) => console.error(e));
  };

  const newSchedule = async (data: ScheduleDataType, token: string) => {
    return postSchedule(data, token)
      .then(() => router.push('/list'))
      .catch((e) => console.error(e));
  };

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <form className="h-full flex flex-col gap-10 web:gap-14">
        {isClient && (
          <>
            <TextInput
              id="title"
              label="타이틀"
              value={title}
              placeholder="타이틀을 입력해주세요"
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <FormLabel must id="step" label="전형단계">
              <GridChips checked={[step]} onClick={handleChipClick} />
            </FormLabel>
            <FormLabel id="company-position" must label="지원하는 회사/직무">
              <TextInput
                id="company"
                value={company}
                placeholder="회사명을 입력해주세요"
                onChange={(e) => setCompany(e.currentTarget.value)}
              />
              <TextInput
                id="position"
                value={position}
                placeholder="직무를 입력해주세요"
                onChange={(e) => setPosition(e.currentTarget.value)}
              />
            </FormLabel>
            <FormLabel
              id="date-time"
              label="일정"
              message="서류마감일, 면접일 등을 입력해 보세요!"
            >
              <DateTimePicker
                date={date}
                time={time}
                onChange={(date, time) => {
                  setDate(date);
                  setTime(time);
                }}
              />
            </FormLabel>
            <FormLabel
              must={false}
              id="link-platform"
              label="채용공고 링크"
              message={`${
                isLinkValid(link)
                  ? autoPlatform
                    ? '채용사이트 정보가 맞는지 확인 후 저장해주세요!'
                    : '채용사이트를 직접 입력해주세요'
                  : ''
              }`}
              errorMessage={`${
                !!link.length && !isLinkValid(link) && !autoPlatform
                  ? 'URL형식에 맞게 입력해주세요'
                  : ''
              }`}
            >
              <TextInput
                id="link"
                type="url"
                value={link}
                onChange={(e) => setLink(e.currentTarget.value)}
                placeholder="지원한 채용 링크를 첨부해 주세요"
              />
              {link && (
                <TextInput
                  id="platform"
                  value={platform}
                  onChange={(e) => setPlatform(e.currentTarget.value)}
                  placeholder={autoPlatform || ''}
                />
              )}
            </FormLabel>
            <FormLabel must={false} id="memo" label="메모">
              <TextArea
                id="memo"
                value={memo}
                placeholder={`지원 관련 메모를 남겨 주세요. (최대 ${TEXTAREA_MAX_LENGTH}자)`}
                maxLength={TEXTAREA_MAX_LENGTH}
                onChange={(e) => setMemo(e.currentTarget.value)}
              />
            </FormLabel>
          </>
        )}
      </form>
      <div className="py-7 web:py-10">
        <Button
          type="submit"
          label="저장"
          active={isReady}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default Form;
