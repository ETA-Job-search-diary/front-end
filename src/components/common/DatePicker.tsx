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
        <button>
          <span className="h-full flex items-center border-b border-black100 text-xs web:text-md">
            <input
              id={id}
              type="text"
              value={date ? getFormatByDate(date) : ''}
              onChange={(e) => setDate(new Date(e.currentTarget.value))}
              placeholder={`${getFormatByDate(new Date())}`}
              className={`w-full font-medium text-black900 placeholder:text-black200  placeholder:text-xs web:placeholder:text-md placeholder:font-medium p-1 web:p-2`}
              {...rest}
            />
            <Icon
              name="calendar"
              className={`h-4 w-4 web:h-5 web:w-5 ${
                !!date ? 'stroke-black900' : 'stroke-black100'
              }`}
            />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-1 web:p-2">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
