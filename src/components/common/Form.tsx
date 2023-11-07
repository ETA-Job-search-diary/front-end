'use client';

import { useRouter } from 'next/navigation';
import TextArea from './TextArea';
import TextInput from './TextInput';
import Chip from './Chip';
import { ChangeEvent, useState } from 'react';
import ChipInput from './ChipInput';
import Button from './Button';
import FormLabel from './FormLabel';
import { STEPS } from '@/constants/form';
import { getPlatformFromLink } from '@/lib/form';
//TODO: 임시저장기능, 수정기능, 유효성검사
const Form = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState('');
  const [position, setPosition] = useState('');
  const [link, setLink] = useState('');
  const [platform, setPlatform] = useState('');
  const [memo, setMemo] = useState('');

  const autoPlatform = getPlatformFromLink(link);
  const isReady = title.length > 0 && steps.length > 0 && position.length > 0;

  const handleLink = (e: ChangeEvent<HTMLInputElement>) =>
    setLink(e.currentTarget.value);

  const handlePlatform = (e: ChangeEvent<HTMLInputElement>) =>
    setPlatform(e.currentTarget.value);

  const handleChipClick = (value: string) => {
    if (steps === value) setSteps('');
    else setSteps(value);
  };

  const handleChipInputClick = () => {
    setSteps('');
  };

  //TODO: 전형단계 입력했다가 다른 거 클릭했을때 focus 효과 없애기
  const handleChipInputBlur = () => {
    setSteps(steps);
  };

  const handleStepChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSteps(e.currentTarget.value);
  };

  const handleSubmit = () => {
    const data = {
      title,
      steps,
      position,
      link,
      platform: platform || autoPlatform,
      memo,
    };
    console.log(data);
  };

  return (
    <form className="flex flex-col justify-between gap-7 web:gap-10 py-3 web:py-6">
      <TextInput
        must
        id="title"
        type="text"
        label="타이틀"
        placeholder="타이틀을 입력해주세요"
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <FormLabel must id={steps} label="전형단계">
        <ul className="grid grid-cols-4 gap-3 xs:gap-1 xs:grid-cols-3">
          {STEPS.map(({ value, name }) => (
            <li key={value}>
              <Chip
                label={name}
                checked={steps === value}
                onClick={() => handleChipClick(value)}
              />
            </li>
          ))}
          <ChipInput
            onReset={handleChipInputBlur}
            onClick={handleChipInputClick}
            onChange={handleStepChange}
          />
        </ul>
      </FormLabel>
      <div className="flex flex-col gap-2">
        <TextInput
          must
          id="회사명"
          label="지원하는 회사/직무"
          type="text"
          placeholder="회사명"
          onChange={(e) => setPosition(e.currentTarget.value)}
        />
        <TextInput id="회사명" type="text" placeholder="직무" />
      </div>
      <div className="flex flex-col gap-3">
        <TextInput
          id="채용공고"
          label="채용공고"
          type="url"
          value={link}
          onChange={handleLink}
          placeholder="채용공고링크"
        />
        <TextInput
          id="지원플랫폼"
          type="text"
          value={platform}
          onChange={handlePlatform}
          placeholder={autoPlatform || '지원플랫폼을 입력해주세요'}
        />
      </div>
      <TextArea
        id="메모"
        label="메모"
        placeholder="지원 관련 메모를 남겨 주세요. (최대 200자)"
        maxLength={200}
        onChange={(e) => setMemo(e.currentTarget.value)}
      />
      <Button label="저장" active={isReady} onClick={handleSubmit} />
    </form>
  );
};

export default Form;
