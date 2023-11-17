import { MouseEvent } from 'react';
import Button from '../common/Button';

interface SubmitButtonProps {
  active: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SubmitButton = ({ active, onClick }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      size="xs"
      label="저장"
      color="primary-border"
      active={active}
      onClick={onClick}
    />
  );
};

export default SubmitButton;
