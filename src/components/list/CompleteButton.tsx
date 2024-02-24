import { ScheduleStatusType } from '@/model/schedule';
import { MouseEvent } from 'react';
import Button, { ButtonVariantTypes } from '../common/Button';

const buttonVariants: Record<
  ScheduleStatusType,
  { label: string; variant: ButtonVariantTypes }
> = {
  pending: {
    label: '합격여부 입력하기',
    variant: 'primary',
  },
  pass: {
    label: '합격 🥳',
    variant: 'light-gray',
  },
  fail: {
    label: '불합격 🥺',
    variant: 'light-gray',
  },
};

interface CompleteButtonProps {
  status: ScheduleStatusType;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const CompleteButton = ({ status, onClick }: CompleteButtonProps) => {
  const isPending = status === 'pending';

  return (
    <Button
      size="sm"
      variant={buttonVariants[status].variant}
      disabled={!isPending}
      label={buttonVariants[status].label}
      onClick={onClick}
    />
  );
};

export default CompleteButton;
