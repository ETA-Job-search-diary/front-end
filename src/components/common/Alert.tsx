import { createPortal } from 'react-dom';
import Button from './Button';
import useDisableBodyScroll from '@/hook/useDisableBodyScroll';
import { MouseEvent } from 'react';

export const alertTypes = {
  CANCEL: '취소',
  DELETE: '삭제',
  LOGIN: '로그인이 필요해요',
  CONFIRM: '확인',
  EDIT: '수정',
};

interface AlertProps {
  message: string;
  type: {
    value: string;
    onClick: () => void;
  }[];
  onClose: () => void;
}

const Alert = ({ message, type, onClose }: AlertProps) => {
  if (typeof window === 'undefined') return null;

  useDisableBodyScroll();

  const handleBackGroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={`fixed top-0 z-30 mx-auto flex min-h-screen w-full min-w-[280px] max-w-[500px] items-center justify-center bg-alert`}
      onClick={handleBackGroundClick}
    >
      <section
        className={`flex min-w-[60%] flex-col items-center justify-center rounded-medium bg-white px-4 py-4 text-black800 shadow-md`}
      >
        <div className="flex grow items-center justify-center p-11 text-xs">
          {message}
        </div>
        <div className="flex w-full justify-between gap-1.5">
          {type.map(({ value, onClick }, index) => (
            <Button
              key={value}
              color="primary"
              label={value}
              active={type.length === 1 || index !== 0 ? true : false}
              size="xs"
              onClick={onClick}
            />
          ))}
        </div>
      </section>
    </div>,
    document.body.querySelector('main') || document.body,
  );
};

export default Alert;
