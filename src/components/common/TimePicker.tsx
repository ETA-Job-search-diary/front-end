import { convertTimeFormat, getFormattedCurrentTime } from '@/service/date';
import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from 'react';
import MeridiemPicker from './MeridiemPicker';

interface TimePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  isDesktop?: boolean;
  value: string;
  onSetValue: (value: string) => void;
}
//!! 사파리 웹에서 ampm이 안사라짐....
const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  ({ isDesktop, value, onSetValue, ...rest }, ref) => {
    const { meridiem, time24Hour } = getFormattedCurrentTime(value);

    const isFilled = value !== undefined;

    const [mer, setMer] = useState(meridiem);
    const [time, setTime] = useState(time24Hour);

    const handleMeridiemChange = (value: string) => {
      const formatedTime = convertTimeFormat(value, time);
      onSetValue(formatedTime);
      setMer(value);
    };

    const handleTimeChange = ({
      target: { value },
    }: ChangeEvent<HTMLInputElement>) => {
      if (!isDesktop) return onSetValue(value);
      const formatedTime = convertTimeFormat(mer, value);
      onSetValue(formatedTime);
      setTime(value);
    };

    return (
      <div
        className={`w-full h-10 web:h-12 text-xs web:text-md grid web:grid-cols-[1fr_2fr] gap-4`}
      >
        {isDesktop && meridiem && (
          <MeridiemPicker meridiem={meridiem} onChange={handleMeridiemChange} />
        )}
        <input
          ref={ref}
          type="time"
          defaultValue={time}
          className={`w-full min-w-[140px] h-10 web:h-12 py-2 px-[0.8rem] text-start web:cursor-text bg-primary-bg border-[0.8px] border-primary300 rounded-small ${
            isFilled
              ? 'text-black900 text-xs web:text-sm'
              : 'text-black300 text-xs web:text-sm font-medium'
          } without_ampm`}
          step="600"
          required
          onChange={handleTimeChange}
          {...rest}
        />
      </div>
    );
  },
);

export default TimePicker;
