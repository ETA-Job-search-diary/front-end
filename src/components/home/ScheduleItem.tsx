import { getFormattedDate } from '@/service/date';
import Link from 'next/link';
import Badge from '../common/Badge';
import Icon from '@/assets/Icon';
import { ScheduleSimpleType } from '@/model/schedule';
import { getBadgeByStep, getStepByValue } from '@/service/schedule';

const ScheduleItem = ({
  id,
  title,
  step,
  company,
  position,
  date,
}: ScheduleSimpleType) => {
  const { date: formattedDate, day, endTime } = getFormattedDate(date);
  const badge = getBadgeByStep(step);

  return (
    <Link
      href={`/schedule/${id}`}
      className="hover:bg-light transition-colors whitespace-nowrap grid grid-cols-[auto_1fr_auto] border border-black100 rounded-large py-3 web:py-6 h-[88px] web:h-[129px]"
    >
      <div className="w-full h-full flex flex-col justify-center items-center text-black900 xs:px-3 px-6 web:px-[30px] border-r border-black100 ">
        <h3 className="font-bold xs:text-sm text-lg web:text-2xl">
          {formattedDate}
        </h3>
        <span className="xs:text-[10px] text-xxs web:text-sm">{day}</span>
      </div>
      <div className="w-full flex flex-col justify-center gap-0.5 web:gap-1 xs:pl-3 pl-6 web:pl-[30px] overflow-hidden">
        <h3 className="text-black900 font-bold xs:text-[10px] text-xxs web:text-md truncate">
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

export default ScheduleItem;
