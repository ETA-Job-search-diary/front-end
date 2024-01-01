'use client';

import AccountButton from '@/components/home/AccountButton';
import { format, isSameDay } from 'date-fns';
import { useState } from 'react';
import { useNavigation } from 'react-day-picker';
import useSWR from 'swr';
import { StatisticsType } from '../signin/StepStatistics';
import { Calendar } from '../ui/calendar';

type HomeCalendar = {
  data: EventsType;
};

type EventsType =
  | {
      date: string;
      company: string;
      step: StatisticsType;
    }[]
  | [];

const HomeCalendar = () => {
  const today = new Date();
  const [month, setMonth] = useState<Date>(today);
  const currentMonth = format(month, 'yyyy-MM');
  const { data } = useSWR<HomeCalendar>(
    `api/schedules/calendar?date=${currentMonth}`,
  );
  //TODO: data.data 확인해야됨
  const events = data?.data;

  return (
    <Calendar
      month={month}
      onMonthChange={setMonth}
      className="h-max rounded-2xl bg-white px-3 pb-2 pt-6"
      classNames={{
        day: 'h-full w-11 flex flex-col gap-0.5 justify-center',
        day_today: 'font-extrabold text-primary-500 pointer-events-none',
        head_row: 'flex justify-between w-full pb-2 border-b border-black-100',
        head_cell: 'w-11 text-0.9 font-medium text-black-900',
        row: 'flex justify-between w-full mt-2 first:mt-4',
      }}
      components={{
        Caption: ({ displayMonth }) => {
          const { goToMonth, nextMonth, previousMonth } = useNavigation();
          return (
            <div className="flex items-end justify-between">
              <div className="grid grid-cols-[minmax(7.5rem,1fr)_1fr] gap-2">
                <h1 className="pl-2 text-1.2 font-bold text-black-900 web:font-semibold">
                  {format(displayMonth, 'yyyy년 MM월')}
                </h1>
                <div className="flex items-end gap-4">
                  <button
                    disabled={!previousMonth}
                    onClick={() => previousMonth && goToMonth(previousMonth)}
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
              <AccountButton />
            </div>
          );
        },
        DayContent: ({ date }) => {
          return (
            <>
              <div className="text-0.9">{format(date, 'd')}</div>
              <div className="flex h-12 w-11 flex-col">
                {events?.map(({ date: eventDate, company, step }) => {
                  return (
                    isSameDay(date, new Date(eventDate)) && (
                      <span
                        key={company}
                        className={`overflow-hidden whitespace-nowrap rounded-[0.1rem] px-[0.1rem] py-[1px] text-0.6 font-bold ${eventStyle[step]}`}
                      >
                        {company}
                      </span>
                    )
                  );
                })}
              </div>
            </>
          );
        },
      }}
    />
  );
};

export default HomeCalendar;

const eventStyle = {
  document: 'bg-orange-50 text-orange-100',
  personality: 'bg-blue-100 text-blue-200',
  interview: 'bg-mint-50 text-mint-100',
  etc: 'bg-purple-50 text-purple-100',
};
