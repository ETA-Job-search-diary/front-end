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

interface AlertProps {
  message: string;
  type: {
    value: keyof typeof AlertTypes;
    onClick: () => void;
  }[];
  onClose: () => void;
}

const Alert = ({ message, type, onClose }: AlertProps) => {
  return (
    <PortalSection className="bg-white" onClose={onClose}>
      <div className="grow p-8 pb-7 text-center">{message}</div>
      <div className="flex w-full justify-between gap-1.5">
        {type.map(({ value, onClick }) => (
          <Button
            key={value}
            variant={ButtonColors[value]}
            label={AlertTypes[value]}
            onClick={onClick}
            className={value === 'CANCEL' ? 'border border-primary-500' : ''}
          />
        ))}
      </div>
    </PortalSection>
  );
};

export default Alert;
