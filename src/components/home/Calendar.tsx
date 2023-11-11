'use client';
import { useEffect, useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays } from 'date-fns';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '@/constants/service';
import { useSession } from 'next-auth/react';
import { getFormattedDate } from '@/service/date';
import Icon from '@/assets/Icon';

interface HeaderProps {
  current: Date;
  prevMonth: () => void;
  nextMonth: () => void;
  // goToToday: () => void;
}

type EventsType = string[];

interface CellProps {
  today: Date;
  current: Date;
  events?: EventsType;
}

interface TodayProps {
  goToToday: () => void;
}

const today = new Date();

export const Calender = () => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const [events, setEvents] = useState<EventsType>([]);

  const [current, setCurrent] = useState(today);
  const currentMonth = format(current, 'yyyy-MM');

  const prevMonth = () => setCurrent(subMonths(current, 1));
  const nextMonth = () => setCurrent(addMonths(current, 1));

  // const goToToday = () => {
  //   setCurrent(today);
  // };

  useEffect(() => {
    if (!token) return;
    const getEvents = async () => {
      const res = await axios.get(
        `${BASE_URL}/schedules/calendar?date=${currentMonth}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setEvents(res.data);
    };
    getEvents();
  }, [currentMonth]);

  return (
    <>
      <div className="relative border border-black100 rounded-large flex flex-col justify-start gap-2 web:gap-4 h-60 web:h-[360px] bg-white">
        <Icon
          name="mainCharacter"
          className="absolute -top-[50px] web:-top-[80px] right-0 xs:w-14 w-24 h-16 web:w-36 web:h-28"
        />
        <Calender.Header
          current={current}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          // goToToday={goToToday}
        />
        <div className="h-full flex flex-col gap-2 text-xxs web:text-[15px] px-4 web:px-5 pb-3 web:pb-4">
          <Calender.Weeks />
          <Calender.Cell today={today} current={current} events={events} />
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
    <div className="flex justify-between pt-3.5 px-7 web:pt-6 web:px-[38px]">
      <div className="grid grid-cols-[1fr_27px_auto] web:grid-cols-[1fr_35px_auto] xs:text-sm text-md web:text-xl font-bold text-black900">
        <span>{format(current, 'yyyy')}년</span>
        <span className="place-self-end">{format(current, 'LL')}</span>
        <span>월</span>
      </div>
      {/* <Calender.Button goToToday={goToToday} /> */}
      <div className="flex items-center gap-3.5">
        <Button
          variant="outline"
          size="icon"
          onClick={prevMonth}
          className="w-[1.5rem] h-[1.5rem]"
        >
          <ChevronLeft className="h-4 w-4 text-[#949494]" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextMonth}
          className="w-[1.5rem] h-[1.5rem]"
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
        <li key={d} className="text-black900 font-semibold">
          {d}
        </li>
      ))}
    </ul>
  );
};

Calender.Cell = ({ today, current, events }: CellProps) => {
  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(monthStart);
  const from = startOfWeek(monthStart);
  const to = endOfWeek(monthEnd);

  const rows = [];
  let day = from;

  const weekElements = (day: Date) => {
    const formattedDate = format(day, 'd');
    const isToday = isSameDay(day, today);

    const weekEvents =
      events &&
      events.filter((event) => {
        const checkedDay = new Date(getFormattedDate(event).fullDate);
        return isSameDay(checkedDay, day);
      });

    return (
      <div
        key={day.toString()}
        className="w-full h-full flex flex-col gap-1 items-center justify-center font-medium"
      >
        {isToday && (
          <span className="inline-block xs:w-4 xs:h-4 w-5 h-5 web:w-6 web:h-6 rounded-full bg-black" />
        )}
        <span
          className={`${
            format(current, 'M') !== format(day, 'M')
              ? 'text-black200 font-medium'
              : `${isToday ? `text-white font-bold absolute leading-7` : ''}`
          }`}
        >
          {formattedDate}
        </span>
        {weekEvents && weekEvents.length > 0 && (
          <span className="rounded-full bg-primary500 mx-auto w-1.5 h-1.5 web:w-[5px] web:h-[5px]"></span>
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
