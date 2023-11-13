'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import TextArea from './TextArea';
import TextInput from './TextInput';
import Chip from './Chip';
import { useState, MouseEvent, useEffect } from 'react';
import Button from './Button';
import FormLabel from './FormLabel';
import { STEPS } from '@/constants/form';
import { getPlatformFromLink } from '@/service/form';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import { BASE_URL } from '@/constants/service';
import useMediaQuery from '@/hook/useMediaQuery';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '../ui/toast';
const desktopMediaQuery = '(min-width: 500px)';

//TODO: 임시저장기능, 수정기능
const Form = () => {
  const { toast } = useToast();
  const router = useRouter();

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
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
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

  const isDevReady = isReady && link.length > 0 && memo.length > 0;

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
      title: '항목을 모두 입력해주세요 🙇🏻‍♀️',
      description:
        '필수 항목만 저장할 수 있도록 수정하고 있어요.. 잠시만 기다려주세요',
    });
  };

  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();
    if (isReady && !isDevReady) {
      handleSubmitValidationToast();
      return;
    }

    if (!isReady) {
      handleSubmitValidationToast();
      return;
    }

    const convertTime = (date?: Date, time?: string) => {
      if (!date || !time) return;
      const convertedDate = format(new Date(date), 'yyyy-MM-dd');
      const formattedDate = `${convertedDate}T${time}:00.000Z`;
      return formattedDate;
    };
    const timeString = convertTime(date, time);

    const data = {
      title,
      step,
      company,
      position,
      date: timeString,
      link,
      platform: platform || autoPlatform,
      memo,
    };
    //TODO: link, platform, memo 빈값일때 처리
    axios
      .post(`${BASE_URL}/schedules`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => router.push('/list'))
      .catch((err) => console.log(err));
  };

  const handleTimeChange = (value: string) => setTime(value);

  const isDesktop = useMediaQuery({
    mediaQuery: desktopMediaQuery,
  });

  //!! TODO: 새로고침 에러때문에 임시 해결책.. hydration 에러
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <form className="h-full flex flex-col justify-between pb-4 web:pb-5 gap-[2.5rem] web:gap-[3.5rem]">
        {isClient && (
          <>
            <TextInput
              must
              id="title"
              type="text"
              label="타이틀"
              placeholder="타이틀을 입력해주세요"
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <FormLabel must id="step" label="전형단계">
              <ul className="grid grid-cols-4 gap-[0.7rem]">
                {STEPS.map(({ value, name }) => (
                  <li key={value}>
                    <Chip
                      label={name}
                      checked={step === value}
                      onClick={() => handleChipClick(value)}
                    />
                  </li>
                ))}
              </ul>
            </FormLabel>
            <FormLabel id="company" must label="지원하는 회사/직무">
              <TextInput
                must
                id="company"
                type="text"
                placeholder="회사명을 입력해주세요"
                onChange={(e) => setCompany(e.currentTarget.value)}
              />
              <TextInput
                must
                id="position"
                type="text"
                placeholder="직무를 입력해주세요"
                onChange={(e) => setPosition(e.currentTarget.value)}
              />
            </FormLabel>
            <FormLabel
              must
              id="date-time"
              label="일정"
              message="서류마감일, 면접일 등을 입력해 보세요!"
            >
              {!isDesktop ? (
                <span className="grid grid-cols-2 gap-1.5 web:gap-4">
                  <DatePicker id="date" date={date} setDate={setDate} />
                  <TimePicker
                    isDesktop={isDesktop}
                    value={time}
                    onSetValue={handleTimeChange}
                  />
                </span>
              ) : (
                <>
                  <DatePicker id="date" date={date} setDate={setDate} />
                  <TimePicker
                    isDesktop={isDesktop}
                    value={time}
                    onSetValue={handleTimeChange}
                  />
                </>
              )}
            </FormLabel>
            <FormLabel
              id="link"
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
                  type="text"
                  value={platform}
                  onChange={(e) => setPlatform(e.currentTarget.value)}
                  placeholder={autoPlatform || ''}
                />
              )}
            </FormLabel>
            <FormLabel id="memo" label="메모">
              <TextArea
                id="memo"
                placeholder="지원 관련 메모를 남겨 주세요. (최대 200자)"
                maxLength={200}
                onChange={(e) => setMemo(e.currentTarget.value)}
              />
            </FormLabel>
            <Button
              type="submit"
              label="저장"
              active={isReady}
              onClick={handleSubmit}
            />
          </>
        )}
      </form>
    </>
  );
};

export default Form;
