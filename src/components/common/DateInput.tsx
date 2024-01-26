import Icon from '@/assets/Icon';
import { convertDateFormat } from '@/service/date';
import { formTextStyle } from './Form';

interface DateInputProps {
  date: string;
}

const DateInput = ({ date }: DateInputProps) => {
  return (
    <span className="flex h-full w-full items-center justify-between rounded-small border-1 border-primary-300 bg-primary-light-50 pr-3">
      <span className={`px-[0.8rem] py-2 ${formTextStyle}`}>
        {convertDateFormat(date)}
      </span>
      <Icon
        name="calendar"
        className={`h-4 w-4 web:h-5 web:w-5 ${
          !!date ? 'stroke-black-900' : 'stroke-black-100'
        }`}
      />
    </span>
  );
};

export default DateInput;
