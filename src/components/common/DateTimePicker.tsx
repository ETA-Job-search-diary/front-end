import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import useMediaQuery from '@/hook/useMediaQuery';

interface DateTimePickerProps {
  date: string;
  time: string;
  onChange: (date: string, time: string) => void;
}

const DESKTOP_MEDIAQUERY = '(min-width: 500px)';

const DateTimePicker = ({ date, time, onChange }: DateTimePickerProps) => {
  const isDesktop = useMediaQuery(DESKTOP_MEDIAQUERY);

  console.log(date, time);
  return (
    <span
      className={`${
        !isDesktop
          ? 'grid grid-cols-2 gap-1.5 web:gap-4'
          : 'flex flex-col gap-2 web:gap-4'
      }`}
    >
      <DatePicker
        id="date"
        date={date}
        setDate={(value) => {
          onChange(value, time);
        }}
      />
      <TimePicker
        isDesktop={isDesktop}
        value={time}
        onSetValue={(value) => {
          onChange(date, value);
        }}
      />
    </span>
  );
};

export default DateTimePicker;
