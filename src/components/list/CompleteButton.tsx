import { ScheduleStatusType } from '@/model/schedule';
import { MouseEvent } from 'react';
import Button from '../common/Button';

const StatusButton = {
  pending: '합격여부 입력하기',
  pass: '합격',
  fail: '불합격',
};

interface CompleteButtonProps {
  status: ScheduleStatusType;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const CompleteButton = ({ status, onClick }: CompleteButtonProps) => {
  const buttonText = StatusButton[status];
  const isPending = status === 'pending';

  return (
    <Button
      size="sm"
      variant={isPending ? 'primary' : 'light-gray'}
      disabled={!isPending}
      label={buttonText}
      onClick={onClick}
    />
  );
};

export default CompleteButton;
