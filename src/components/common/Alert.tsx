import { createPortal } from 'react-dom';
import Button, { ColorTypes } from './Button';
import useDisableBodyScroll from '@/hook/useDisableBodyScroll';
import { MouseEvent } from 'react';

const AlertTypes = {
  CANCEL: '취소',
  DELETE: '삭제',
  CONFIRM: '확인',
};

const ButtonColors: Record<keyof typeof AlertTypes, ColorTypes> = {
  CANCEL: 'primary-border',
  DELETE: 'primary',
  CONFIRM: 'primary',
};

interface AlertProps {
  message: string;
  submessage?: string;
  type: {
    value: keyof typeof AlertTypes;
    onClick: () => void;
  }[];
  onClose: () => void;
}

const Alert = ({ message, submessage, type, onClose }: AlertProps) => {
  if (typeof window === 'undefined') return null;

  useDisableBodyScroll();

  const handleBackGroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={`max-w-500 min-w-280 fixed top-0 z-30 mx-auto flex min-h-screen w-full items-center justify-center bg-alert`}
      onClick={handleBackGroundClick}
    >
      <section
        className={`flex min-w-[60%] flex-col items-center justify-center rounded-medium bg-white px-4 py-4 shadow-md`}
      >
        <div className="grow p-8 pb-7 text-center">
          <h1 className="text-1 text-black800">{message}</h1>
          {submessage && (
            <div className="whitespace-pre pt-0.5 text-0.85 text-black500">
              {submessage}
            </div>
          )}
        </div>
        <div className="flex w-full justify-between gap-1.5">
          {type.map(({ value, onClick }) => {
            return (
              <Button
                key={value}
                color={ButtonColors[value]}
                label={AlertTypes[value]}
                border={value === 'CANCEL'}
                onClick={onClick}
              />
            );
          })}
        </div>
      </section>
    </div>,
    document.body.querySelector('main')!,
  );
};

export default Alert;
