'use client';

import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import TextArea from './TextArea';
import TextInput from './TextInput';
import Chip from './Chip';
import { useState, MouseEvent } from 'react';
import Button from './Button';
import FormLabel from './FormLabel';
import { STEPS } from '@/constants/form';
import { getPlatformFromLink } from '@/service/form';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';

//TODO: 임시저장기능, 수정기능
const Form = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const token = session?.user.accessToken;

  if (!token) redirect('/');

  const [title, setTitle] = useState('');
  const [step, setStep] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [link, setLink] = useState('');
  const [platform, setPlatform] = useState('');
  const [memo, setMemo] = useState('');

  const autoPlatform = getPlatformFromLink(link);

  const isReady =
    title.length > 0 &&
    step.length > 0 &&
    company.length > 0 &&
    position.length > 0;

  const handleChipClick = (value: string) => {
    if (step === value) setStep('');
    else setStep(value);
  };

  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();
    if (!isReady) {
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
      .post('http://track.bugilabs.com:3905/api/schedules', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => router.push('/list'))
      .catch((err) => console.log(err));
  };

  const handleTimeChange = (value: string) => setTime(value);

  return (
    <>
      <form className="h-[calc(100%-170px)] flex flex-col justify-between gap-6 web:gap-7 py-4 web:py-5">
        <TextInput
          must
          id="title"
          type="text"
          label="타이틀"
          placeholder="타이틀을 입력해주세요"
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <FormLabel must id="step" label="전형단계">
          <ul className="grid grid-cols-4 gap-4 xs:gap-1">
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
        <div className="flex flex-col gap-4">
          <TextInput
            must
            id="company"
            label="지원하는 회사/직무"
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
        </div>
        <FormLabel
          must
          id="date-time"
          label="일정"
          message="서류마감일, 면접일 등을 입력해 보세요!"
        >
          <DatePicker id="date" date={date} setDate={setDate} />
          <TimePicker value={time} onSetValue={handleTimeChange} />
        </FormLabel>
        <div className="flex flex-col gap-4">
          <TextInput
            id="link"
            label="채용공고"
            type="url"
            value={link}
            onChange={(e) => setLink(e.currentTarget.value)}
            placeholder="지원한 채용 링크를 첨부해 주세요"
          />
          <TextInput
            id="platform"
            type="text"
            value={platform}
            onChange={(e) => setPlatform(e.currentTarget.value)}
            placeholder={
              autoPlatform ||
              (link
                ? '채용공고 사이트를 직접 입력해주세요'
                : '채용공고 사이트를 입력해주세요')
            }
          />
        </div>
        <TextArea
          id="memo"
          label="메모"
          placeholder="지원 관련 메모를 남겨 주세요. (최대 200자)"
          maxLength={200}
          onChange={(e) => setMemo(e.currentTarget.value)}
        />
        <Button
          type="submit"
          label="저장"
          active={isReady}
          onClick={handleSubmit}
        />
      </form>
    </>
  );
};

export default Form;
