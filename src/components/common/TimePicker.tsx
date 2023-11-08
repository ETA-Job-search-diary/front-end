'use client';

import { getFormattedCurrentTime } from '@/service/date';
import { InputHTMLAttributes, forwardRef } from 'react';
import MeridiemPicker from './MeridiemPicker';

interface TimePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
}
//TODO isMobile, isWeb 확인 후 조건부 렌더링을 해야..스타일 적용이 가능할 것같음.
const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  ({ value, ...rest }, ref) => {
    const isFilled = value !== undefined;
    const { meridiem, time: currentTime } = getFormattedCurrentTime();

    return (
      <label
        htmlFor="time"
        className="p-1 web:p-2 text-xs web:text-md border-b border-black100"
      >
        <input
          ref={ref}
          type="time"
          defaultValue={currentTime}
          className={`bg-white w-full web:cursor-text ${
            isFilled ? 'text-black900' : 'text-black200'
          } without_ampm`}
          step="600"
          required
          {...rest}
        />
      </label>
    );
  },
);

export default TimePicker;
