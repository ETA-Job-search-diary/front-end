'use client';

import { InputHTMLAttributes } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FormIdType } from '@/model/form';
import Icon from '@/assets/Icon';
import { getFormatByDate } from '@/service/date';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: FormIdType;
  label?: string;
  must?: boolean;
  isError?: boolean;
  date?: Date;
  setDate: (date: Date | undefined) => void;
}
//!!!!! TODO: input 없애고 일반 텍스트로 변경해야됨. hydration 에러남
const DatePicker = ({
  id,
  must,
  isError,
  date,
  setDate,
  ...rest
}: TextInputProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span
          className="h-10 web:h-12 bg-primary-bg border-[0.6px] border-primary300 rounded-small pr-3 flex items-center"
          suppressHydrationWarning
        >
          <input
            id={id}
            type="text"
            value={date ? getFormatByDate(date) : ''}
            onChange={(e) => setDate(new Date(e.currentTarget.value))}
            placeholder={`${getFormatByDate(new Date())}`}
            className={`bg-transparent w-full h-full font-medium text-black900 text-xs web:text-md placeholder:text-black300 placeholder:text-xxs web:placeholder:text-sm placeholder:font-medium py-2 px-[0.8rem]`}
            {...rest}
          />
          <Icon
            name="calendar"
            className={`h-4 w-4 web:h-5 web:w-5 ${
              !!date ? 'stroke-black900' : 'stroke-black100'
            }`}
          />
        </span>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 py-2 px-[0.8rem]">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
