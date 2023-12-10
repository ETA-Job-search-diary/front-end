import { getFormattedDateTimeInfo } from '@/service/date';
import Link from 'next/link';
import Badge from '../common/Badge';
import Icon from '@/assets/Icon';
import { ScheduleSimpleType } from '@/model/schedule';
import { getBadgeByStep, getStepByValue } from '@/service/form';
import { isToday, isBefore } from 'date-fns';

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
      } hover:bg-light transition-colors whitespace-nowrap grid grid-cols-[auto_1fr_auto] rounded-large py-3.5 web:py-4 border ${borderStyle}`}
    >
      <div
        className={`w-full h-full flex flex-col justify-center items-center px-5 web:px-6 border-r ${borderStyle} ${accentStyle}`}
      >
        <h3 className="font-bold xs:text-sm text-lg web:text-xl">{date}</h3>
        <span className="text-xxs web:text-xs">{day}</span>
      </div>
      <div className="w-full flex flex-col justify-center gap-1 pl-5 web:pl-6 pr-2 overflow-hidden">
        <p className="flex items-center gap-1">
          <Icon name="briefcase" className="web:w-4 web:h-4 w-2.5 h-2.5" />
          <span className="text-black500 text-xxxs web:text-xxs truncate">
            {position} | {company}
          </span>
        </p>
        {endTime && (
          <div className="flex gap-1.5 web:gap-2 items-center">
            {badge && <Badge label={badge} />}
            <span className="text-black700 text-xxxs web:text-xxs">
              {endTime}
            </span>
          </div>
        )}
      </div>
      <div className="w-full place-self-center text-black600 font-bold pr-5 web:pr-6 text-xxs web:text-xs">
        {getStepByValue(step)}
      </div>
    </Link>
  );
};

const borderStyle = 'border-black100';
const accentStyle = 'text-black900';

export default ScheduleItem;
