import { getFormattedCurrentTime } from '@/service/date';
import { formTextStyle } from './Form';

interface TimeInputProps {
  time: string;
}

const TimeInput = ({ time }: TimeInputProps) => {
  const { meridiem, time12Hour } = getFormattedCurrentTime(time);

  return (
    <span
      className={`${formTextStyle} bg-primary-light-50 border-primary-300 flex h-full w-full items-center justify-between rounded-small border-form px-[0.8rem] py-2 pr-3`}
    >
      {meridiem} {time12Hour}
    </span>
  );
};

export default TimeInput;
