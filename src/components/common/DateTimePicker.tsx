import useMediaQuery from '@/hook/useMediaQuery';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import DateInput from './DateInput';
import { Calendar } from '@/components/ui/calendar';
import {
  formatCalendarDate,
  convertDateToAlternateFormat,
} from '@/service/date';
import useScrollPointer from '@/hook/useScrollPointer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import TimePicker from './TimePicker';

interface PickerProps {
  time: string;
  date: string;
  selectedDate: Date;
  onDate: (date?: Date) => void;
  onTime: (time: string) => void;
}

interface DateTimePickerProps {
  date: string;
  time: string;
  onChange: (date: string, time: string) => void;
}

const DESKTOP_MEDIAQUERY = '(min-width: 500px)';

const DateTimePicker = ({ date, time, onChange }: DateTimePickerProps) => {
  const isDesktop = useMediaQuery(DESKTOP_MEDIAQUERY);
  const selectedDate = new Date(convertDateToAlternateFormat(date, '-'));

  const handleCalendarSelect = (value?: Date) => {
    if (!value) return;
    const date = formatCalendarDate(value);
    if (!date) return;
    onChange(date, time);
  };

  const handleTimeChange = (value: string) => onChange(date, value);

  return (
    <>
      {isDesktop ? (
        <DateTimePicker.Desktop
          selectedDate={selectedDate}
          date={date}
          time={time}
          onDate={handleCalendarSelect}
          onTime={handleTimeChange}
        />
      ) : (
        <DateTimePicker.Mobile
          selectedDate={selectedDate}
          date={date}
          onDate={handleCalendarSelect}
          time={time}
          onTime={handleTimeChange}
        />
      )}
    </>
  );
};

DateTimePicker.Desktop = ({
  selectedDate,
  time,
  date,
  onTime,
  onDate,
}: PickerProps) => {
  const { pointer, toggleScrollPointer } = useScrollPointer();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="date">
        <AccordionTrigger onClick={toggleScrollPointer} className="flex gap-3">
          <DateInput date={date} />
          <TimePicker
            time={time}
            onTime={onTime}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </AccordionTrigger>
        <AccordionContent>
          <Calendar mode="single" selected={selectedDate} onSelect={onDate} />
        </AccordionContent>
      </AccordionItem>
      <div ref={pointer} />
    </Accordion>
  );
};

DateTimePicker.Mobile = ({
  date,
  time,
  selectedDate,
  onDate,
  onTime,
}: PickerProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Sheet>
        <SheetTrigger>
          <DateInput date={date} />
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="rounded-t-3xl border-none pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-8 outline-none"
        >
          <Calendar mode="single" selected={selectedDate} onSelect={onDate} />
        </SheetContent>
      </Sheet>
      <TimePicker time={time} onTime={onTime} />
    </div>
  );
};

export default DateTimePicker;
