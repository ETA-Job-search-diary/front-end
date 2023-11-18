import { MouseEvent } from 'react';
import Button from '../common/Button';

interface SubmitButtonProps {
  label?: string;
  active: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SubmitButton = ({
  label = '저장',
  active,
  onClick,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      size="sm"
      label={label}
      color="primary-border"
      active={active}
      onClick={onClick}
    />
  );
};

export default SubmitButton;
