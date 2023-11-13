'use client';

import { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameDay, addDays } from 'date-fns';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BASE_URL } from '@/constants/service';
import { getFormattedDate } from '@/service/date';
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

interface TodayProps {
  goToToday: () => void;
}

const today = new Date();

export const Calender = () => {
  const [current, setCurrent] = useState(today);
  const currentMonth = format(current, 'yyyy-MM');
  const { data: events } = useSWR<EventsType>([
    `${BASE_URL}/schedules/calendar?date=${currentMonth}`,
  ]);

  const prevMonth = () => setCurrent(subMonths(current, 1));
  const nextMonth = () => setCurrent(addMonths(current, 1));

  return (
    <>
      <div className="relative border border-black100 rounded-large flex flex-col justify-start gap-2 web:gap-4 h-60 web:h-[360px] bg-white">
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
          className="h-full flex flex-col gap-2 text-xxs web:text-[15px] px-4 web:px-5 pb-3 web:pb-4"
          suppressHydrationWarning
        >
          <Calender.Head />
          <Calender.Body today={today} current={current} events={events} />
        </table>
      </div>
    </>
  );
};

Calender.Caption = ({ current, prevMonth, nextMonth }: CaptionProps) => {
  return (
    <div className="flex justify-between pt-3.5 px-7 web:pt-6 web:px-[38px]">
      <div className="grid grid-cols-[1fr_27px_auto] web:grid-cols-[1fr_35px_auto] xs:text-sm text-md web:text-xl font-bold text-black900">
        <span>{format(current, 'yyyy')}년</span>
        <span className="place-self-end">{format(current, 'LL')}</span>
        <span>월</span>
      </div>
      <div className="flex items-center gap-3.5">
        <Button
          variant="outline"
          size="icon"
          onClick={prevMonth}
          className="w-[1.5rem] h-[1.5rem]"
        >
          <ChevronLeft
            aria-label="left-button"
            className="h-4 w-4 text-[#949494]"
          />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextMonth}
          className="w-[1.5rem] h-[1.5rem]"
        >
          <ChevronRight
            aria-label="right-button"
            className="h-4 w-4 text-[#949494]"
          />
        </Button>
      </div>
    </div>
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

    return (
      <td
        key={day.toString()}
        className="w-full h-full flex flex-col gap-[1px] items-center justify-center font-medium"
      >
        <span className="flex flex-col justify-center items-center">
          {isToday && (
            <span className="inline-block xs:w-4 xs:h-4 w-5 h-5 web:w-6 web:h-6 rounded-full bg-black" />
          )}
          <span
            className={`${
              format(current, 'M') !== format(day, 'M')
                ? 'text-black200 font-medium'
                : `${isToday ? `text-white font-bold absolute` : ''}`
            }`}
          >
            {formattedDate}
          </span>
        </span>
        {weekEvents && weekEvents.length > 0 ? (
          <span className="rounded-full bg-primary500 mx-auto w-1.5 h-1.5 web:w-[5px] web:h-[5px]"></span>
        ) : (
          <span className="rounded-full mx-auto w-1.5 h-1.5 web:w-[5px] web:h-[5px]"></span>
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
    <tbody className="h-full flex flex-col">
      {rows.map((week, index) => (
        <tr key={index} className="h-full grid grid-cols-7">
          {week}
        </tr>
      ))}
    </tbody>
  );
};
