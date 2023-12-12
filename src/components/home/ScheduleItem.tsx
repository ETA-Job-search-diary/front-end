import { getFormattedDateTimeInfo } from '@/service/date';
import Link from 'next/link';
import Badge from '../common/Badge';
import Icon from '@/assets/Icon';
import { ScheduleSimpleType } from '@/model/schedule';
import { getBadgeByStep, getStepByValue } from '@/service/form';
import { isToday, isBefore } from 'date-fns';
import { memo } from 'react';

const currentDate = new Date();

const ScheduleItem = ({
  id,
  step,
  company,
  position,
  date: dateInfo,
}: ScheduleSimpleType) => {
  const { fullDate, date, day, endTime } = getFormattedDateTimeInfo(dateInfo);
  const isBeforeToday =
    isBefore(new Date(fullDate), currentDate) && !isToday(new Date(fullDate));
  const badge = getBadgeByStep(step);

  return (
    <Link
      href={`/schedule/${id}`}
      className={`${
        isBeforeToday ? 'bg-ligtht-gray' : 'bg-white'
      } grid grid-cols-[auto_1fr_auto] whitespace-nowrap rounded-large border py-3.5 transition-colors hover:bg-light web:py-4 ${borderStyle}`}
    >
      <div
        className={`flex h-full w-full flex-col items-center justify-center border-r px-5 web:px-6 ${borderStyle} ${accentStyle}`}
      >
        <h3 className="text-lg font-bold xs:text-sm web:text-xl">{date}</h3>
        <span className="text-xxs web:text-xs">{day}</span>
      </div>
      <div className="flex w-full flex-col justify-center gap-1 overflow-hidden pl-5 pr-2 web:pl-6">
        <p className="flex items-center gap-1">
          <Icon name="briefcase" className="h-2.5 w-2.5 web:h-4 web:w-4" />
          <span className="truncate text-xxxs text-black500 web:text-xxs">
            {position} | {company}
          </span>
        </p>
        {endTime && (
          <div className="flex items-center gap-1.5 web:gap-2">
            {badge && <Badge label={badge} />}
            <span className="text-xxxs text-black700 web:text-xxs">
              {endTime}
            </span>
          </div>
        )}
      </div>
      <div className="w-full place-self-center pr-5 text-xxs font-bold text-black600 web:pr-6 web:text-xs">
        {getStepByValue(step)}
      </div>
    </Link>
  );
};

const borderStyle = 'border-black100';
const accentStyle = 'text-black900';

export default memo(ScheduleItem);
