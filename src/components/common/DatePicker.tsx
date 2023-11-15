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
  getConvertToDate,
  getFormatCurrentDateTime,
  getFormatDateStringToSlash,
} from '@/service/date';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  date: string;
  setDate: (date: string) => void;
}

const DatePicker = ({ date, setDate }: TextInputProps) => {
  return (
    <Popover>
      <PopoverTrigger placeholder={date} asChild>
        <span className="flex justify-between items-center h-10 web:h-12 bg-primary-bg border-[0.8px] border-primary300 rounded-small pr-3">
          <span className="font-medium text-black900 text-xs web:text-sm py-2 px-[0.8rem]">
            {getFormatCurrentDateTime(date).date}
          </span>
          <Icon
            name="calendar"
            className={`h-4 w-4 web:h-5 web:w-5 ${
              !!date ? 'stroke-black900' : 'stroke-black100'
            }`}
          />
        </span>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 py-2 px-[0.8rem]">
        <Calendar
          mode="single"
          selected={new Date(getFormatDateStringToSlash(date))}
          onSelect={(select) => {
            setDate(getConvertToDate(select as Date));
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
