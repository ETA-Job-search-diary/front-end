import useFocus from '@/hook/useFocus';
import { ChangeEvent, InputHTMLAttributes, forwardRef } from 'react';
import { formPlaceholderStyle, formTextStyle } from './Form';

interface TimePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  isSelect: boolean;
  time: string;
  onTime: (time: string) => void;
}

const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  ({ isSelect, time, onTime, ...props }, ref) => {
    const { isFocus, onBlur, onFocus } = useFocus();

    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      onTime(value);
    };

    return (
      <input
        ref={ref}
        type="time"
        value={time}
        className={`h-11 w-full rounded-small border-1 px-[0.8rem] py-2 text-left web:cursor-text ${isFocus || isSelect ? 'border-primary-300' : 'border-black-100'} ${
          isSelect
            ? `${formTextStyle} bg-primary-light-50`
            : `text-0.95 ${formPlaceholderStyle}`
        }`}
        step="600"
        required
        onChange={handleTimeChange}
        onBlur={onBlur}
        onFocus={(e) => {
          e.stopPropagation();
          onFocus();
        }}
        {...props}
      />
    );
  },
);

export default TimePicker;
