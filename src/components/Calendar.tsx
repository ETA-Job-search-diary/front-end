'use client';
import { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays } from 'date-fns';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderProps {
  current: Date;
  prevMonth: () => void;
  nextMonth: () => void;
  // goToToday: () => void;
}

interface EventType {
  title: string;
  from: string;
  to: string;
}

interface CellProps {
  today: Date;
  current: Date;
  events?: EventType[];
  range?: Date[];
  selectedDate: Date;
  onDateClick: (day: Date) => void;
}

interface TodayProps {
  goToToday: () => void;
}

interface CalenderProps {
  today: Date;
  events?: EventType[];
  range?: Date[];
  onClick?: (day: Date) => void;
}

export const Calender = ({ today, events }: CalenderProps) => {
  const [current, setCurrent] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);

  const prevMonth = () => setCurrent(subMonths(current, 1));
  const nextMonth = () => setCurrent(addMonths(current, 1));
  const onDateClick = (day: Date) => setSelectedDate(day);
  // const goToToday = () => {
  //   setCurrent(today);
  //   setSelectedDate(today);
  // };

  return (
    <>
      <div className="border border-black100 rounded-large flex flex-col justify-start gap-2 web:gap-6 h-[300px] web:h-[408px] bg-white">
        <Calender.Header
          current={current}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          // goToToday={goToToday}
        />
        <div className="h-full flex flex-col gap-2 text-xs web:text-md px-4 web:px-5 pb-3 web:pb-4">
          <Calender.Weeks />
          <Calender.Cell
            today={today}
            current={current}
            events={events}
            selectedDate={selectedDate}
            onDateClick={onDateClick}
          />
        </div>
      </div>
    </>
  );
};

Calender.Header = ({
  current,
  prevMonth,
  nextMonth,
}: // goToToday,
HeaderProps) => {
  return (
    <div className="flex justify-between pt-4 px-7 web:pt-[38px] web:px-[38px]">
      <div className="grid grid-cols-[1fr_27px_auto] web:grid-cols-[1fr_35px_auto] text-md web:text-xxl font-bold text-black900">
        <span>{format(current, 'yyyy')}년</span>
        <span className="place-self-end">{format(current, 'LL')}</span>
        <span>월</span>
      </div>
      {/* <Calender.Button goToToday={goToToday} /> */}
      <div className="flex gap-[10px]">
        <Button
          variant="outline"
          size="icon"
          onClick={prevMonth}
          className="w-[26px] h-[26px]"
        >
          <ChevronLeft className="h-4 w-4 text-[#949494]" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextMonth}
          className="w-[26px] h-[26px]"
        >
          <ChevronRight className="h-4 w-4 text-[#949494]" />
        </Button>
      </div>
    </div>
  );
};

Calender.Weeks = () => {
  const date = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <ul className="grid grid-cols-7 place-items-center">
      {date.map((d) => (
        <li key={d} className="text-black600">
          {d}
        </li>
      ))}
    </ul>
  );
};

Calender.Cell = ({
  today,
  current,
  events,
  // selectedDate,
  onDateClick,
}: CellProps) => {
  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(monthStart);
  const from = startOfWeek(monthStart);
  const to = endOfWeek(monthEnd);

  const rows = [];
  let day = from;

  const weekElements = (day: Date) => {
    const formattedDate = format(day, 'd');
    // const isCurrent = isSameMonth(day, monthStart);
    // const isCurrentDay = isSameDay(day, selectedDate);
    const isToday = isSameDay(day, today);

    const weekEvents =
      events &&
      events.filter((event) => {
        const eventfrom = new Date(event.from);
        const eventTo = new Date(event.to);
        return isSameDay(eventfrom, day) || (eventfrom < day && eventTo >= day);
      });

    return (
      <div
        key={day.toString()}
        className="w-full h-full flex flex-col gap-1 items-center justify-center font-medium"
        onClick={() => onDateClick(day)}
      >
        {isToday && (
          <span className="inline-block w-7 h-7 web:w-9 web:h-9 rounded-full bg-black" />
        )}
        <span
          className={
            format(current, 'M') !== format(day, 'M')
              ? 'text-black200'
              : `${isToday ? `text-white font-bold absolute leading-7` : ''}`
          }
        >
          {formattedDate}
        </span>
        {weekEvents && weekEvents.length > 0 && (
          <span className="rounded-full bg-primary500 mx-auto w-1 h-1 web:w-[5px] web:h-[5px]"></span>
        )}
      </div>
    );
  };

  while (day <= to) {
    rows.push(
      Array.from({ length: 7 }, () => {
        const weekElement = weekElements(day);
        day = addDays(day, 1);
        return weekElement;
      }),
    );
  }

  return (
    <div className="h-full flex flex-col">
      {rows.map((week, index) => (
        <div key={index} className="h-full grid grid-cols-7">
          {week}
        </div>
      ))}
    </div>
  );
};
//TODO: 기획 - 오늘 이동 버튼의 필요성 검토
Calender.Button = ({ goToToday }: TodayProps) => {
  return (
    <button className="" onClick={goToToday}>
      오늘
    </button>
  );
};
