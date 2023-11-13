import { getFormattedDate } from '@/service/date';
import Link from 'next/link';
import Badge from '../common/Badge';
import Icon from '@/assets/Icon';
import { ScheduleSimpleType } from '@/model/schedule';
import { getBadgeByStep, getStepByValue } from '@/service/form';
import { isToday, isBefore } from 'date-fns';

const currentDate = new Date();

const ScheduleItem = ({
  id,
  title,
  step,
  company,
  position,
  date,
}: ScheduleSimpleType) => {
  const {
    fullDate,
    date: formattedDate,
    day,
    endTime,
  } = getFormattedDate(date);
  const badge = getBadgeByStep(step);
  const isBeforeToday =
    isBefore(new Date(fullDate), currentDate) && !isToday(new Date(fullDate));

  return (
    <Link
      href={`/schedule/${id}`}
      className={`${
        isBeforeToday ? 'bg-ligtht-gray' : 'bg-white'
      } hover:bg-light transition-colors whitespace-nowrap grid grid-cols-[auto_1fr_auto] rounded-large py-3 web:py-6 h-[88px] web:h-[129px] border ${borderStyle}`}
    >
      <div
        className={`w-full h-full flex flex-col justify-center items-center xs:px-3 px-6 web:px-[30px] border-r ${borderStyle} ${accentStyle}`}
      >
        <h3 className="font-bold xs:text-sm text-lg web:text-2xl">
          {formattedDate}
        </h3>
        <span className="xs:text-[10px] text-xxs web:text-sm">{day}</span>
      </div>
      <div className="w-full flex flex-col justify-center gap-0.5 web:gap-1 xs:pl-3 pl-6 web:pl-[30px] overflow-hidden">
        <h3
          className={`xs:text-[10px] text-xxs web:text-md truncate ${accentStyle}`}
        >
          {title}
        </h3>
        <p className="flex items-center gap-1">
          <Icon name="briefcase" className="web:w-4 web:h-4 w-2.5 h-2.5" />
          <span className="text-black500 xs:text-[10px] text-xxs web:text-sm truncate">
            {position} | {company}
          </span>
        </p>
        {endTime && (
          <div className="flex gap-1.5 web:gap-2 items-center">
            {badge && <Badge label={badge} />}
            <span className="text-black700 xs:text-[10px] text-xxs web:text-xs">
              {endTime}
            </span>
          </div>
        )}
      </div>
      <div className="w-full place-self-center text-black600 font-bold xs:text-[10px] text-xxs web:text-sm xs:pr-3 pr-6 web:pr-[30px]">
        {getStepByValue(step)}
      </div>
    </Link>
  );
};

const borderStyle = 'border-black100';
const accentStyle = 'text-black900 ';

export default ScheduleItem;
