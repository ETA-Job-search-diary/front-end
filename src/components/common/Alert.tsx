import { HTMLAttributes, forwardRef } from 'react';
import Button, { ButtonVariantTypes } from './Button';
import PortalSection from './PortalSection';

export const AlertTypes = {
  CANCEL: '취소',
  DELETE: '삭제',
  CONFIRM: '확인',
  EDIT: '수정',
  PASS: '합격',
  FAIL: '불합격',
};

const ButtonColors: Record<keyof typeof AlertTypes, ButtonVariantTypes> = {
  CANCEL: 'primary-border',
  DELETE: 'primary',
  CONFIRM: 'primary',
  EDIT: 'primary',
  PASS: 'primary',
  FAIL: 'gray',
};

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
  type: {
    value: keyof typeof AlertTypes;
    onClick: () => void;
  }[];
  onClose: () => void;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ message, type, onClose, ...props }, ref) => {
    return (
      <PortalSection
        ref={ref}
        className="bg-white"
        onClose={onClose}
        {...props}
      >
        <div className="grow p-8 pb-7 text-center">{message}</div>
        <div className="flex w-full justify-between gap-1.5">
          {type.map(({ value, onClick }) => (
            <Button
              id={`alert_${value.toLowerCase()}_button`}
              key={value}
              variant={ButtonColors[value]}
              label={AlertTypes[value]}
              onClick={onClick}
              className={
                value === 'CANCEL' ? 'border-1 border-primary-500' : ''
              }
            />
          ))}
        </div>
      </PortalSection>
    );
  },
);

export default Alert;
