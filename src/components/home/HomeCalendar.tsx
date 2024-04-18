'use client';

import { fetcher } from '@/lib/fetcher';
import { StepTypes } from '@/model/schedule';
import { getSteps } from '@/service/form';
import { useListStore } from '@/store/zustand';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';
import { Calendar } from '../ui/calendar';
import AccountButton from './AccountButton';
import CaptionPicker from './CaptionPicker';
import HomeStatistics from './HomeStatistics';

type HomeCalendar = {
  events: EventsType;
  holidays: string[];
};

type EventsType = Record<
  string,
  { id: string; company: string; step: StepTypes }[]
>;

const HomeCalendar = () => {
  const todayMonth = new Date();
  const [month, setMonth] = useState<Date>(todayMonth);
  const currentMonth = format(month, 'yyyy-MM');
  const { data } = useSWR<HomeCalendar>(
    `api/schedules/calendar?date=${currentMonth}`,
    fetcher,
  );

  const events = data?.events;
  const holidays = data?.holidays;

  const { push } = useRouter();
  const handleSwitchTab = useListStore((state) => state.setTab);

  const handleDayClick = (isPast: boolean) => {
    if (isPast) {
      handleSwitchTab('past');
    } else handleSwitchTab('coming');
    push('/list');
  };

  return (
    <Calendar
      month={month}
      onMonthChange={setMonth}
      footer={
        <div className="px-page pb-2 pt-1">
          <HomeStatistics />
        </div>
      }
      classNames={{
        cell: 'w-full',
        day: 'font-medium text-center',
        day_today: 'bg-transparent',
        head_row:
          'grid grid-cols-7 border-b border-black-100 pb-4 pt-6 px-page',
        head_cell: 'w-full text-0.9 font-semibold text-black-900',
        row: 'grid grid-cols-7 mt-0.5 first:mt-3 px-page',
        table: 'w-full bg-white rounded-t-3xl',
      }}
      components={{
        Caption: ({ displayMonth }) => {
          const [year, month] = format(displayMonth, 'yyyy년 MM월').split(' ');
          return (
            <div className="flex items-center justify-between px-page pt-4">
              <div className="grid grid-cols-[minmax(9rem,1fr)_auto] items-end gap-2 xs:grid-cols-[minmax(6rem,1fr)_1fr] xs:gap-1">
                <h1 className="text-1.5 leading-none text-white xs:text-1">
                  <span className="font-medium">{year} </span>
                  <span className="font-extrabold">{month}</span>
                </h1>
                <CaptionPicker
                  currentMonth={currentMonth}
                  onMonthChange={(year, month) => {
                    setMonth(new Date(year, month - 1));
                  }}
                />
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
          const isPast = date < new Date();
          return (
            <>
              <div
                className={`mx-auto mb-[1px] min-h-[1.5rem] w-[1.5rem] rounded-full text-0.9 leading-6 ${
                  today
                    ? 'bg-black text-white'
                    : isHoliday
                      ? 'text-red-500'
                      : isSaturday
                        ? 'text-blue-200'
                        : ''
                }`}
              >
                {format(date, 'd')}
              </div>
              <div className="h-14 w-full web:h-16">
                {!!isEvents?.length && (
                  <button
                    className="w-full"
                    onClick={() => handleDayClick(isPast)}
                  >
                    <ul className="flex w-full cursor-pointer flex-col gap-[0.5px]">
                      {isEvents.map(({ company, step }) => (
                        <li
                          key={company}
                          className={`mx-auto w-full max-w-[3rem] overflow-hidden whitespace-nowrap rounded-[0.1rem] px-[0.1rem] py-[0.5px] text-0.6 font-extrabold ${
                            eventStyle[getSteps(step)]
                          }`}
                        >
                          {company}
                        </li>
                      ))}
                    </ul>
                  </button>
                )}
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
  documentAssignment: 'bg-orange-50 text-orange-100',
  personalityWritten: 'bg-blue-100 text-blue-200',
  interview: 'bg-mint-50 text-mint-100',
  etc: 'bg-purple-50 text-purple-100',
};
