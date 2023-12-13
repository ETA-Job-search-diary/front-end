'use client';

import { InputHTMLAttributes } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Icon from '@/assets/Icon';
import {
  formatCalendarDate,
  convertDateToAlternateFormat,
} from '@/service/date';
import { formTextStyle } from './Form';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  date: string;
  setDate: (date: string) => void;
}

const DatePicker = ({ date, setDate }: TextInputProps) => {
  return (
    <Popover>
      <PopoverTrigger>
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
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 px-[0.8rem] py-2">
        <Calendar
          mode="single"
          selected={new Date(convertDateToAlternateFormat(date, '-'))}
          onSelect={(select) => {
            setDate(formatCalendarDate(select as Date));
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
