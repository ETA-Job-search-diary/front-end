'use client';

import Icon from '@/assets/Icon';
import AccountButton from '@/components/home/AccountButton';
import { fetcher } from '@/lib/fetcher';
import { StepTypes } from '@/model/schedule';
import { getSteps } from '@/service/form';
import { useListStore } from '@/store/zustand';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
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
      className="rounded-2xl bg-white px-3 pt-4 xs:px-2 xs:pt-4 web:pt-6"
      classNames={{
        cell: 'w-full',
        day: 'font-medium text-center',
        day_today: 'bg-transparent',
        head_row: 'grid grid-cols-7 pb-2 border-b border-black-100',
        head_cell: 'w-full text-0.9 font-semibold text-black-900',
        row: 'grid grid-cols-7 mt-0.5 first:mt-3',
      }}
      components={{
        Caption: ({ displayMonth }) => {
          const { goToMonth, nextMonth, previousMonth } = useNavigation();
          return (
            <div className="flex items-end justify-between">
              <div className="grid grid-cols-[minmax(7.5rem,1fr)_1fr] items-end gap-2 xs:grid-cols-[minmax(6rem,1fr)_1fr]">
                <h1 className="pl-2 text-1.2 font-bold leading-none text-black-900 xs:text-1 web:font-semibold">
                  {format(displayMonth, 'yyyy년 MM월')}
                </h1>
                <div className="flex items-end gap-7 xs:gap-2">
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
          const isPast = date < new Date();
          return (
            <>
              <div
                className={`mx-auto mb-[1px] min-h-[1.5rem] w-[1.5rem] rounded-full text-0.9 leading-6 ${
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
              </div>
              <div className="h-14 w-full web:h-16">
                {!!isEvents?.length && (
                  <ul className="flex w-full cursor-pointer flex-col gap-[0.5px]">
                    <button onClick={() => handleDayClick(isPast)}>
                      {isEvents.map(({ company, step }) => (
                        <li
                          key={company}
                          className={`mx-auto w-full max-w-[2.75rem] overflow-hidden whitespace-nowrap rounded-[0.1rem] px-[0.1rem] py-[0.5px] text-0.6 font-extrabold ${
                            eventStyle[getSteps(step)]
                          }`}
                        >
                          {company}
                        </li>
                      ))}
                    </button>
                  </ul>
                )}
                {today && !isNoEvents && (
                  <Icon name="characterBlack" className="m-auto w-6" />
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
