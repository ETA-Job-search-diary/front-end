import { getFormattedCurrentTime } from '@/service/date';
import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from 'react';
import MeridiemPicker, { MeridiemType } from './MeridiemPicker';
import useMediaQuery from '@/hook/useMediaQuery';

interface TimePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onSetValue: (value: string) => void;
}

const desktopMediaQuery = '(min-width: 500px)';
//TODO: 코드 정리 1순위
const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  ({ value, onSetValue, ...rest }, ref) => {
    const isDesktop = useMediaQuery({
      mediaQuery: desktopMediaQuery,
    });

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
      <div className="web:h-[30px] text-xs web:text-md grid web:grid-cols-[1fr_2fr] gap-4">
        {isDesktop && meridiem && (
          <MeridiemPicker meridiem={meridiem} onChange={handleMeridiemChange} />
        )}
        <input
          ref={ref}
          type="time"
          defaultValue={currentTime}
          className={`border-b border-black100 p-1 web:p-2 bg-white w-full web:cursor-text ${
            isFilled ? 'text-black900' : 'text-black200'
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
