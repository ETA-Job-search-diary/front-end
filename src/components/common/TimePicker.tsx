import { ChangeEvent, InputHTMLAttributes, forwardRef } from 'react';
import { formPlaceholderStyle, formTextStyle } from './Form';

interface TimePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  time: string;
  onTime: (time: string) => void;
}

const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  ({ time, onTime, ...rest }, ref) => {
    const isFilled = time !== undefined;

    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      onTime(value);
    };

    return (
      <input
        ref={ref}
        type="time"
        defaultValue={time}
        className={`h-11 w-full rounded-small border-1 border-primary-300 bg-primary-light-50 px-[0.8rem] py-2 text-left web:cursor-text ${
          isFilled ? `${formTextStyle}` : `text-0.95 ${formPlaceholderStyle}`
        }`}
        step="600"
        required
        onChange={handleTimeChange}
        {...rest}
      />
    );
  },
);

export default TimePicker;
