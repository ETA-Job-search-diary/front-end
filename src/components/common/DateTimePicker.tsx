import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Calendar } from '@/components/ui/calendar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useMediaQuery from '@/hook/useMediaQuery';
import useScrollPointer from '@/hook/useScrollPointer';
import {
  convertDateToAlternateFormat,
  formatCalendarDate,
  getFormattedISODateTime,
} from '@/service/date';
import { format } from 'date-fns';
import { useNavigation } from 'react-day-picker';
import DateInput from './DateInput';
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
  onChange: (date: string) => void;
}

const DESKTOP_MEDIAQUERY = '(min-width: 500px)';

const DateTimePicker = ({ date: inputDate, onChange }: DateTimePickerProps) => {
  const isDesktop = useMediaQuery(DESKTOP_MEDIAQUERY);

  const { date, time } = getFormattedISODateTime(inputDate);

  const selectedDate = new Date(convertDateToAlternateFormat(date, '-'));

  const handleCalendarSelect = (value?: Date) => {
    if (!value) return;
    const date = formatCalendarDate(value);
    if (!date) return;
    const fullDate = `${date}T${time}:00.000Z`;
    onChange(fullDate);
  };

  const handleTimeChange = (value: string) => {
    const fullDate = `${date}T${value}:00.000Z`;
    onChange(fullDate);
  };

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
          time={time}
          onDate={handleCalendarSelect}
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
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDate}
            components={{
              Caption: ({ displayMonth }) => {
                const { goToMonth, nextMonth, previousMonth } = useNavigation();
                return (
                  <div className="grid grid-cols-[minmax(4.5rem,auto)_1fr] gap-2">
                    <h1 className="pl-2 text-1 font-bold text-black-900">
                      {format(displayMonth, 'yyyy.MM')}
                    </h1>
                    <div className="flex gap-3">
                      <button
                        disabled={!previousMonth}
                        onClick={() =>
                          previousMonth && goToMonth(previousMonth)
                        }
                      >
                        <Calendar.LeftButton />
                      </button>
                      <button
                        disabled={!nextMonth}
                        onClick={() => nextMonth && goToMonth(nextMonth)}
                      >
                        <Calendar.RightButton />
                      </button>
                    </div>
                  </div>
                );
              },
            }}
          />
        </SheetContent>
      </Sheet>
      <TimePicker time={time} onTime={onTime} />
    </div>
  );
};

export default DateTimePicker;
