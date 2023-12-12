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
    const { meridiem } = getFormattedCurrentTime(value);

    const [mer, setMer] = useState(meridiem);
    const [time, setTime] = useState('00:00');

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
              } grid w-full gap-4 web:grid-cols-[1fr_2fr] ${formTextStyle}`}
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
      className={`h-full w-full rounded-small border-[0.8px] border-primary300 bg-primary-bg px-[0.8rem] py-2 text-left web:cursor-text ${
        isFilled ? `${formTextStyle}` : `text-form ${formPlaceholderStyle}`
      }`}
      step="600"
      required
      {...rest}
    />
  );
});

export default TimePicker;
