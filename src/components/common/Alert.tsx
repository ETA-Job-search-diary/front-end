import { createPortal } from 'react-dom';
import Button from './Button';
import useDisableBodyScroll from '@/hook/useDisableBodyScroll';
import { MouseEvent } from 'react';

export enum AlertType {
  cancel = '취소',
  delete = '삭제',
  login = '로그인이 필요해요',
  confirm = '확인',
  edit = '수정',
}

interface AlertProps {
  message: string;
  type: {
    value: AlertType;
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
      className={`fixed z-30 top-0 min-h-screen mx-auto min-w-[280px] w-full max-w-[500px] flex justify-center items-center bg-alert`}
      onClick={handleBackGroundClick}
    >
      <section
        className={`bg-white rounded-medium text-black800 flex flex-col justify-center items-center px-4 py-4 shadow-md`}
      >
        <div className="grow flex justify-center items-center p-11 text-xs">
          {message}
        </div>
        <div className="w-full flex justify-between gap-1.5">
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
