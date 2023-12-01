'use client';

import { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameDay, addDays } from 'date-fns';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

const today = new Date();

export const Calender = () => {
  const [current, setCurrent] = useState(today);
  const currentMonth = format(current, 'yyyy-MM');
  const { data: events } = useSWR<EventsType>([
    `/schedules/calendar?date=${currentMonth}`,
  ]);

  const prevMonth = () => setCurrent(subMonths(current, 1));
  const nextMonth = () => setCurrent(addMonths(current, 1));

  return (
    <div className="relative border border-black100 rounded-large flex flex-col justify-start gap-2 bg-white">
      <Icon
        name="mainCharacter"
        className="absolute -top-[50px] web:-top-[80px] right-0 xs:w-14 w-24 h-16 web:w-36 web:h-28"
      />
      <Calender.Caption
        current={current}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <table
        className="h-full flex flex-col gap-2 text-xxxs web:text-xs px-4 web:px-5 pb-2.5"
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
    <div className="flex justify-between pt-3.5 px-7 web:pt-5 web:px-[38px]">
      <div className="grid grid-cols-[1fr_23px_auto] web:grid-cols-[1fr_27px_auto] text-sm web:text-md xs:text-xs font-bold text-black900">
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
      className="w-[1.5rem] h-[1.5rem]"
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
          <th key={d} className="text-black900 font-semibold">
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

  const rows = [];
  let day = from;

  const weekElements = (day: Date) => {
    const formattedDate = format(day, 'd');
    const isToday = isSameDay(day, today);

    const weekEvents = events?.filter((event) => {
      const checkedDay = event.split('T')[0];
      const currentDay = format(day, 'yyyy-MM-dd');
      const isSameDay = currentDay === checkedDay;
      return isSameDay;
    });

    const isDifferentMonths = format(current, 'M') !== format(day, 'M');

    return (
      <td
        key={day.toString()}
        className="flex flex-col gap-[3px] items-center justify-center font-medium"
      >
        <span className="flex flex-col justify-center items-center">
          {isToday && (
            <span
              className={`inline-block xs:w-4 xs:h-4 w-5 h-5 web:w-6 web:h-6 rounded-full bg-black`}
            />
          )}
          <span
            className={`${
              isDifferentMonths
                ? 'text-black200 font-medium absolute'
                : `${isToday ? `text-white font-bold absolute` : ''}`
            }`}
          >
            {formattedDate}
          </span>
        </span>
        {weekEvents && weekEvents.length > 0 ? (
          <span className="rounded-full bg-primary500 mx-auto w-1 h-1 web:w-[5px] web:h-[5px]"></span>
        ) : (
          <span className="rounded-full mx-auto w-1 h-1 web:w-[5px] web:h-[5px]"></span>
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
    <tbody className="flex flex-col h-[11rem] web:h-max">
      {rows.map((week, index) => (
        <tr key={index} className="grid grid-cols-7 h-full web:h-max">
          {week}
        </tr>
      ))}
    </tbody>
  );
};
