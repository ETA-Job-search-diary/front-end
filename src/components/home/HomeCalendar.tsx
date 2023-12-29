'use client';

import AccountButton from '@/components/home/AccountButton';
import { format, isSameDay } from 'date-fns';
import { StatisticsProps } from '../signin/ApplicationStatistics';
import { Calendar } from '../ui/calendar';
import { useNavigation } from 'react-day-picker';

interface HomeCalendarProps {
  events: {
    [key in keyof StatisticsProps]: {
      date: string;
      company: string;
    }[];
  };
}

const HomeCalendar = ({ events }: HomeCalendarProps) => {
  return (
    <Calendar
      events={events}
      classNames={{
        day: 'h-16 w-12 text-1 grid grid-rows-[1fr,2fr] justify-center',
        day_today: 'font-bold text-primary-500 pointer-events-none',
        head_row: 'flex justify-between w-full pb-4 border-b border-gray100',
        head_cell: 'w-12 text-1 font-medium text-black-900',
        row: 'flex justify-between w-full first:pt-4',
      }}
      components={{
        Caption: ({ displayMonth }) => {
          const { goToMonth, nextMonth, previousMonth } = useNavigation();
          return (
            <div className="flex items-end justify-between pt-5">
              <div className="grid grid-cols-[minmax(8rem,1fr)_1fr] gap-2">
                <h1 className="text-black-900 pl-2 text-[1.8rem] font-bold web:font-semibold">
                  {format(displayMonth, 'yyyy.MM')}
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
          const eventTypes = Object.keys(events) as Array<keyof typeof events>;
          return (
            <>
              <div className="place-self-center">{format(date, 'd')}</div>
              <div className="flex w-11 flex-col">
                {eventTypes.map((eventType) => {
                  const eventInfo = events[eventType]?.find(
                    ({ date: eventDate }) =>
                      isSameDay(date, new Date(eventDate)),
                  );
                  return (
                    eventInfo && (
                      <span
                        key={eventType}
                        className={`truncate rounded-[0.1rem] px-[0.1rem] py-0.5 text-0.6 font-semibold ${eventStyle[eventType]}`}
                      >
                        {eventInfo.company}
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
