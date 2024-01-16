'use client';

import Icon from '@/assets/Icon';
import AccountButton from '@/components/home/AccountButton';
import { fetcher } from '@/lib/fetcher';
import { StepTypes } from '@/model/schedule';
import { getSteps } from '@/service/calendar';
import { format } from 'date-fns';
import { useState } from 'react';
import { useNavigation } from 'react-day-picker';
import useSWR from 'swr';
import { Calendar } from '../ui/calendar';

type HomeCalendar = {
  events: EventsType;
  holidays: string[];
};

type EventsType = Record<
  string,
  { id: string; company: string; step: StepTypes }[]
>;

//TODO: 공휴일 서버사이드로 받아올 수 있는지 확인...!!
const HomeCalendar = () => {
  const today = new Date();
  const [month, setMonth] = useState<Date>(today);
  const currentMonth = format(month, 'yyyy-MM');
  const { data } = useSWR<HomeCalendar>(
    `api/schedules/calendar?date=${currentMonth}`,
    fetcher,
  );

  const events = data?.events;
  const holidays = data?.holidays;

  return (
    <Calendar
      month={month}
      onMonthChange={setMonth}
      className="h-max rounded-2xl bg-white px-3 pb-2 pt-6"
      classNames={{
        day: 'h-full w-11 flex flex-col gap-0.5 justify-center font-medium',
        day_today: 'pointer-events-none',
        head_row: 'flex justify-between w-full pb-2 border-b border-black-100',
        head_cell: 'w-11 text-0.9 font-semibold text-black-900',
        row: 'flex justify-between w-full mt-2 first:mt-4',
      }}
      components={{
        Caption: ({ displayMonth }) => {
          const { goToMonth, nextMonth, previousMonth } = useNavigation();
          return (
            <div className="flex items-end justify-between">
              <div className="grid grid-cols-[minmax(7.5rem,1fr)_1fr] items-end gap-2">
                <h1 className="pl-2 text-1.2 font-bold leading-none text-black-900 web:font-semibold">
                  {format(displayMonth, 'yyyy년 MM월')}
                </h1>
                <div className="flex items-end gap-7">
                  <button
                    aria-label="previous month move button"
                    disabled={!previousMonth}
                    onClick={() => previousMonth && goToMonth(previousMonth)}
                  >
                    <Calendar.LeftButton />
                  </button>
                  <button
                    aria-label="next month move button"
                    disabled={!nextMonth}
                    onClick={() => nextMonth && goToMonth(nextMonth)}
                  >
                    <Calendar.RightButton />
                  </button>
                </div>
              </div>
              <AccountButton />
            </div>
          );
        },
        DayContent: ({ date, activeModifiers: { today, outside } }) => {
          const day = format(date, 'yyyy-MM-dd');
          const isHoliday =
            holidays?.some((holiday) => holiday === day) ||
            (date.getDay() === 0 && !outside);
          const isSaturday = date.getDay() === 6 && !outside;
          const isEvents = events?.[day];
          const isNoEvents = !!Object.values(events || {}).length;

          console.log(isNoEvents);

          return (
            <>
              <p
                className={`mx-auto min-h-[1.5rem] w-max min-w-[1.5rem] rounded-full text-0.9 leading-6 ${
                  isNoEvents && today
                    ? 'bg-black text-white'
                    : isHoliday
                      ? 'text-red-500'
                      : isSaturday
                        ? 'text-blue-200'
                        : ''
                }`}
              >
                {format(date, 'd')}
              </p>
              <p className="flex h-12 w-11 flex-col gap-[1px] web:h-20">
                {isEvents?.map(({ company, step }) => (
                  <span
                    key={company}
                    className={`overflow-hidden whitespace-nowrap rounded-[0.1rem] px-[0.1rem] py-[1px] text-0.6 font-extrabold ${
                      eventStyle[getSteps(step)]
                    }`}
                  >
                    {company}
                  </span>
                ))}
                {!isNoEvents && today && (
                  <Icon name="groupB2" className="w-6 place-self-center" />
                )}
              </p>
            </>
          );
        },
      }}
    />
  );
};

export default HomeCalendar;

const eventStyle = {
  documentAssignment: 'bg-orange-50 text-orange-100',
  personalityWritten: 'bg-blue-100 text-blue-200',
  interview: 'bg-mint-50 text-mint-100',
  etc: 'bg-purple-50 text-purple-100',
};
