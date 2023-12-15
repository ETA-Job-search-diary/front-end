import { getFormattedDateTimeInfo } from '@/service/date';
import Link from 'next/link';
// import Badge from '../common/Badge';
import Icon from '@/assets/Icon';
import { ScheduleSimpleType } from '@/model/schedule';
import { getStepByValue } from '@/service/form';
import { memo } from 'react';

const ScheduleItem = ({
  id,
  step,
  company,
  position,
  date: dateInfo,
}: ScheduleSimpleType) => {
  const { fullDate, date, day } = getFormattedDateTimeInfo(dateInfo);
  const formatStep = getStepByValue(step);

  return (
    <Link
      href={`/schedule/${id}`}
      scroll={false}
      className={`grid grid-cols-[auto_1fr_auto] whitespace-nowrap rounded-large border py-3.5 transition-colors hover:bg-light web:py-4 ${borderStyle}`}
    >
      <div
        className={`flex h-full w-full flex-col items-center justify-center border-r px-5 ${borderStyle} ${accentStyle}`}
      >
        <h3 className="text-lg font-bold xs:text-sm web:text-xl">{date}</h3>
        <span className="text-xxs web:text-xs">{day}</span>
      </div>
      <div className="flex w-full flex-col justify-between overflow-hidden py-1.5 pl-6 pr-2">
        <h3
          className={`truncate text-xs font-semibold leading-5 web:text-sm ${accentStyle}`}
        >
          {company} {formatStep}
        </h3>
        <p className="flex items-center gap-1">
          <Icon name="briefcase" className="h-2.5 w-2.5 web:h-4 web:w-4" />
          <span className="truncate text-xxxs text-black500 web:text-xxs">
            {position}
          </span>
        </p>
      </div>
      <div className="w-full place-self-center pr-6 text-xxs font-bold text-black600 web:pr-6 web:text-xs"></div>
    </Link>
  );
};

const borderStyle = 'border-black100';
const accentStyle = 'text-black900';

export default memo(ScheduleItem);
