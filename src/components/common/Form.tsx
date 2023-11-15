'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import TextArea from './TextArea';
import TextInput from './TextInput';
import { useState, MouseEvent, useEffect } from 'react';
import Button from './Button';
import FormLabel from './FormLabel';
import { getPlatformFromLink } from '@/service/form';
import { useSession } from 'next-auth/react';
import { BASE_URL } from '@/constants/service';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '../ui/toast';
import { convertToDateTime, getFormatByDate } from '@/service/date';
import GridChips from '../list/GridChips';
import DateTimePicker from './DateTimePicker';

const TEXTAREA_MAX_LENGTH = 200;
const today = new Date();
const currentDay = getFormatByDate(today);
const currentHour = today.getHours() + ':00';

// 임시저장
const Form = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const handleRedirectToast = () => {
    toast({
      description: '로그인시간이 만료됐어요. 다시 로그인해주세요',
      action: (
        <ToastAction
          onClick={() => router.push('/auth/login')}
          altText="로그인"
        >
          로그인
        </ToastAction>
      ),
    });
  };

  if (!token) {
    handleRedirectToast();
    return;
  }

  const [title, setTitle] = useState('');
  const [step, setStep] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [date, setDate] = useState<string>(currentDay);
  const [time, setTime] = useState<string>(currentHour);
  const [link, setLink] = useState('');
  const [platform, setPlatform] = useState('');
  const [memo, setMemo] = useState('');
  //TODO: 일정 시간 후 적용하게끔 디바운스 적용필요
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
    if (step === value) setStep('');
    else setStep(value);
  };

  const handleSubmitValidationToast = () => {
    toast({
      title: '항목을 모두 입력해주세요',
    });
  };

  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();

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
    axios
      .post(`${BASE_URL}/schedules`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => router.push('/list'))
      .catch((err) => console.log(err));
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
              placeholder="타이틀을 입력해주세요"
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <FormLabel must id="step" label="전형단계">
              <GridChips checked={[step]} onClick={handleChipClick} />
            </FormLabel>
            <FormLabel id="company-position" must label="지원하는 회사/직무">
              <TextInput
                id="company"
                placeholder="회사명을 입력해주세요"
                onChange={(e) => setCompany(e.currentTarget.value)}
              />
              <TextInput
                id="position"
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
