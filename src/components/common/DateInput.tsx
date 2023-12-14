import Icon from '@/assets/Icon';
import { convertDateToAlternateFormat } from '@/service/date';
import { formTextStyle } from './Form';

interface DateInputProps {
  date: string;
}

const DateInput = ({ date }: DateInputProps) => {
  return (
    <span className="flex h-full w-full items-center justify-between rounded-small border-[0.8px] border-primary300 bg-primary-bg pr-3">
      <span className={`px-[0.8rem] py-2 ${formTextStyle}`}>
        {convertDateToAlternateFormat(date)}
      </span>
      <Icon
        name="calendar"
        className={`h-4 w-4 web:h-5 web:w-5 ${
          !!date ? 'stroke-black900' : 'stroke-black100'
        }`}
      />
    </span>
  );
};

export default DateInput;
