import { combineTo24Hour, getFormattedCurrentTime } from '@/service/date';
import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from 'react';
import MeridiemPicker from './MeridiemPicker';
import { formPlaceholderStyle, formTextStyle } from './Form';

interface TimePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  isDesktop?: boolean;
  value: string;
  onSetValue: (value: string) => void;
}

interface TimePickerWithoutAmpmProps
  extends InputHTMLAttributes<HTMLInputElement> {
  isDesktop?: boolean;
  value: string;
}

const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  ({ isDesktop, value, onSetValue, ...rest }, ref) => {
    const { meridiem, time24Hour } = getFormattedCurrentTime(value);

    const [mer, setMer] = useState(meridiem);
    const [time, setTime] = useState(time24Hour);

    const handleMeridiemChange = (value: string) => {
      const formatedTime = combineTo24Hour(value, time);
      onSetValue(formatedTime);
      setMer(value);
    };

    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (!isDesktop) return onSetValue(value);
      const formatedTime = combineTo24Hour(mer, value);
      onSetValue(formatedTime);
      setTime(value);
    };

    return (
      <>
        {isDesktop ? (
          meridiem && (
            <div
              className={`${
                isDesktop ? 'h-10 web:h-12' : 'h-full'
              } w-full grid web:grid-cols-[1fr_2fr] gap-4 ${formTextStyle}`}
            >
              <MeridiemPicker
                meridiem={meridiem}
                onChange={handleMeridiemChange}
              />
              <TimePickerWithoutAmpm
                ref={ref}
                value={time}
                onChange={(e) => handleTimeChange(e)}
              />
            </div>
          )
        ) : (
          <TimePickerWithoutAmpm
            ref={ref}
            value={time}
            onChange={(e) => handleTimeChange(e)}
          />
        )}
      </>
    );
  },
);

const TimePickerWithoutAmpm = forwardRef<
  HTMLInputElement,
  TimePickerWithoutAmpmProps
>(({ isDesktop, value, ...rest }, ref) => {
  const isFilled = value !== undefined;
  return (
    <input
      ref={ref}
      type="time"
      defaultValue={value}
      className={`w-full h-full py-2 px-[0.8rem] text-left web:cursor-text bg-primary-bg border-[0.8px] border-primary300 rounded-small ${
        isFilled ? `${formTextStyle}` : `text-form ${formPlaceholderStyle}`
      }`}
      step="600"
      required
      {...rest}
    />
  );
});

export default TimePicker;
