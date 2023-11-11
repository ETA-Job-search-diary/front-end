import { getFormattedCurrentTime } from '@/service/date';
import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from 'react';
import MeridiemPicker, { MeridiemType } from './MeridiemPicker';

interface TimePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  isDesktop?: boolean;
  value?: string;
  onSetValue: (value: string) => void;
}

//TODO: 코드 정리 1순위
const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  ({ isDesktop, value, onSetValue, ...rest }, ref) => {
    const { meridiem, time: currentTime } = getFormattedCurrentTime();
    const isFilled = value !== undefined;

    const [mer, setMer] = useState(meridiem);
    const [time, setTime] = useState(currentTime);

    const handleMeridiemChange = (value: string) => {
      const [hour, minute] = time.split(':');
      if (value === MeridiemType.PM && Number(hour) < 12) {
        onSetValue(`${Number(hour) + 12}:${minute}`);
      } else if (value === MeridiemType.AM && Number(hour) >= 12) {
        onSetValue(
          `${(Number(hour) - 12).toString().padStart(2, '0')}:${minute}`,
        );
      } else onSetValue(time);
      setMer(value);
    };

    const handleTimeChange = ({
      target: { value },
    }: ChangeEvent<HTMLInputElement>) => {
      if (!isDesktop) return onSetValue(value);

      const [hour, minute] = value.split(':');
      if (mer === MeridiemType.PM && Number(hour) < 12) {
        onSetValue(`${Number(hour) + 12}:${minute}`);
      } else if (mer === MeridiemType.AM && Number(hour) >= 12) {
        onSetValue(
          `${(Number(hour) - 12).toString().padStart(2, '0')}:${minute}`,
        );
      } else onSetValue(value);
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
          defaultValue={currentTime}
          className={`w-full min-w-[140px] h-10 web:h-12 py-2 px-[0.8rem] text-start web:cursor-text bg-primary-bg border-[0.6px] border-primary300 rounded-small ${
            isFilled
              ? 'text-black900 text-xs web:text-md'
              : 'text-black300 web:text-sm text-xxs font-medium'
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
