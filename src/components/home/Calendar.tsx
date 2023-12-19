'use client';

import { addDays, addMonths, endOfMonth, endOfWeek, format } from 'date-fns';
import { isSameDay, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../ui/button';

import Icon from '@/assets/Icon';
import useSWR from 'swr';

interface CaptionProps {
  current: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}

type EventsType = string[];

interface BodyProps {
  today: Date;
  current: Date;
  events?: EventsType;
}

interface MoveButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const getToday = () => new Date();

export const Calender = () => {
  const today = getToday();
  const [current, setCurrent] = useState(today);
  const currentMonth = format(current, 'yyyy-MM');
  const { data: events } = useSWR<EventsType>([
    `/schedules/calendar?date=${currentMonth}`,
  ]);

  const prevMonth = () => setCurrent(subMonths(current, 1));
  const nextMonth = () => setCurrent(addMonths(current, 1));

  return (
    <div className="relative flex flex-col justify-start gap-2 rounded-large border border-black100 bg-white">
      <Icon
        name="mainCharacter"
        className="absolute -top-[50px] right-0 h-16 w-24 xs:w-14 web:-top-[80px] web:h-28 web:w-36"
      />
      <Calender.Caption
        current={current}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <table
        className="flex h-full flex-col gap-2 px-4 pb-2.5 text-0.8 web:px-5 web:text-1"
        suppressHydrationWarning
      >
        <Calender.Head />
        <Calender.Body today={today} current={current} events={events} />
      </table>
    </div>
  );
};

Calender.Caption = ({ current, prevMonth, nextMonth }: CaptionProps) => {
  return (
    <div className="flex justify-between px-7 pt-3.5 web:px-[38px] web:pt-5">
      <div className="grid grid-cols-[1fr_23px_auto] text-1.1 font-bold text-black900 xs:text-1 web:grid-cols-[1fr_27px_auto] web:text-1.2">
        <span>{format(current, 'yyyy')}년</span>
        <span className="place-self-end">{format(current, 'LL')}</span>
        <span>월</span>
      </div>
      <div className="flex items-center gap-3.5">
        <Calender.MoveButton direction="left" onClick={prevMonth} />
        <Calender.MoveButton direction="right" onClick={nextMonth} />
      </div>
    </div>
  );
};

Calender.MoveButton = ({ direction, onClick }: MoveButtonProps) => {
  const isLeft = direction === 'left';
  const ButtonType = isLeft ? ChevronLeft : ChevronRight;
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className="h-[1.5rem] w-[1.5rem]"
    >
      <ButtonType
        aria-label={`${direction}-button`}
        className="h-4 w-4 text-[#949494]"
      />
    </Button>
  );
};

Calender.Head = () => {
  const date = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <thead>
      <tr className="grid grid-cols-7 place-items-center">
        {date.map((d) => (
          <th key={d} className="font-semibold text-black900">
            {d}
          </th>
        ))}
      </tr>
    </thead>
  );
};

Calender.Body = ({ today, current, events }: BodyProps) => {
  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(monthStart);
  const from = startOfWeek(monthStart);
  const to = endOfWeek(monthEnd);

  const weekEventsMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    events?.forEach((event) => {
      const [checkedDay] = event.split('T');
      map[checkedDay] = map[checkedDay] || [];
      map[checkedDay].push(event);
    });
    return map;
  }, [events]);

  const rows = [];
  let day = from;

  const weekElements = (day: Date) => {
    const formattedDate = format(day, 'd');
    const isToday = isSameDay(day, today);

    const currentDay = format(day, 'yyyy-MM-dd');
    const weekEvents = weekEventsMap[currentDay];

    const isDifferentMonths = format(current, 'M') !== format(day, 'M');

    return (
      <td
        key={day.toString()}
        className="flex flex-col items-center justify-center gap-[3px] font-medium"
      >
        <span className="flex flex-col items-center justify-center">
          {isToday && (
            <span
              className={`inline-block h-5 w-5 rounded-full bg-black xs:h-4 xs:w-4 web:h-6 web:w-6`}
            />
          )}
          <span
            className={`${
              isDifferentMonths
                ? 'absolute font-medium text-black200'
                : `${isToday ? `absolute font-bold text-white` : ''}`
            }`}
          >
            {formattedDate}
          </span>
        </span>
        {weekEvents && weekEvents.length > 0 ? (
          <span className="mx-auto h-1 w-1 rounded-full bg-primary500 web:h-[5px] web:w-[5px]"></span>
        ) : (
          <span className="mx-auto h-1 w-1 rounded-full web:h-[5px] web:w-[5px]"></span>
        )}
      </td>
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
    <tbody className="flex h-[11rem] flex-col web:h-max">
      {rows.map((week, index) => (
        <tr key={index} className="grid h-full grid-cols-7 web:h-max">
          {week}
        </tr>
      ))}
    </tbody>
  );
};
