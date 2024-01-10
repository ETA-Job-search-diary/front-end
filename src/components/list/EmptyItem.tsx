'use client';

import Icon from '@/assets/Icon';
import { SCHEDULE_MESSAGE } from '@/constants/schedule';
import useSession from '@/hook/useSession';
import Link from 'next/link';

interface EmptyItemProps {
  messageType: keyof typeof SCHEDULE_MESSAGE;
}

const EmptyItem = ({ messageType }: EmptyItemProps) => {
  const { token } = useSession();
  const { title, suggestion } = SCHEDULE_MESSAGE[messageType];

  return (
    <div
      role="empty-item"
      className="flex h-[calc(100vh-24rem)] w-full grow flex-col items-center justify-center gap-3 text-black-200"
    >
      <Icon
        aria-label="main-character"
        name="mainCharacter"
        className="w-24 web:w-28"
      />
      <h3 className="text-1.1 font-bold text-primary-500">{title}</h3>
      <p className="whitespace-pre-line text-center text-0.9 font-medium leading-6 text-black-500">
        {suggestion}
      </p>
      {!token && (
        <Link
          href={'/auth/signin'}
          className="rounded-small bg-primary-500 px-6 py-2 font-semibold text-white hover:font-extrabold"
        >
          1초 만에 로그인 하기
        </Link>
      )}
    </div>
  );
};

export default EmptyItem;
