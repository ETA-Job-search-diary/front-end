import { InputHTMLAttributes } from 'react';
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

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  date: string;
  setDate: (date: string) => void;
}

const DatePicker = ({ date, setDate }: TextInputProps) => {
  const { pointer, toggleScrollPointer } = useScrollPointer();

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger onClick={toggleScrollPointer}>
            <DateInput date={date} />
          </AccordionTrigger>
          <AccordionContent className="h-full">
            <Calendar
              mode="single"
              selected={new Date(convertDateToAlternateFormat(date, '-'))}
              onSelect={(select) => {
                setDate(formatCalendarDate(select as Date));
              }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div ref={pointer} />
    </>
  );
};

export default DatePicker;
