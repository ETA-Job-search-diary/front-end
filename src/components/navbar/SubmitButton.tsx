import { MouseEvent } from 'react';
import Button from '../common/Button';

type MouseEventCallback = (e: MouseEvent<HTMLButtonElement>) => void;

interface SubmitButtonProps {
  label?: string;
  active: boolean;
  onClick: MouseEventCallback;
}

const SubmitButton = ({
  label = '저장',
  active,
  onClick,
}: SubmitButtonProps) => {
  const handleSubmitOnce = (onClick: MouseEventCallback) => {
    let done = false;
    return (e: MouseEvent<HTMLButtonElement>) => {
      if (!done) {
        done = true;
        onClick(e);
      }
    };
  };

  return (
    <Button
      type="submit"
      size="sm"
      label={label}
      color="primary-border"
      active={active}
      onClick={handleSubmitOnce(onClick)}
    />
  );
};

export default SubmitButton;
