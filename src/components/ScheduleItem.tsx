import { getFormattedDate } from '@/service/date';
import Link from 'next/link';
import Badge from './common/Badge';
import Icon from '@/assets/Icon';

export interface ScheduleItemProps {
  id: string;
  title: string;
  steps: string;
  company: string;
  position: string;
  date: string;
}

const ScheduleItem = ({
  id,
  title,
  steps,
  company,
  position,
  date,
}: ScheduleItemProps) => {
  const { date: formattedDate, day, endTime } = getFormattedDate(date);

  return (
    <Link
      href={`/schedule/${id}`}
      className="whitespace-nowrap min-w-max grid grid-cols-[auto_1fr_auto] border border-black100 rounded-large py-3 web:py-6 h-[88px] web:h-[129px]"
    >
      <div className="h-full flex flex-col justify-center items-center text-black900 xs:px-3 px-6 web:px-[30px] border-r border-black100 ">
        <h3 className="font-bold text-lg web:text-2xl">{formattedDate}</h3>
        <span className="text-xxs web:text-sm">{day}</span>
      </div>
      <div className="flex flex-col justify-center gap-0.5 web:gap-1 xs:pl-3 pl-6 web:pl-[30px]">
        <h3 className="text-black900 font-bold text-xs web:text-md">{title}</h3>
        <p className="flex items-center gap-1">
          <Icon name="briefcase" className="web:w-4 web:h-4 w-2.5 h-2.5" />
          <span className="text-black500 text-xxs web:text-sm">
            {position} | {company}
          </span>
        </p>
        {endTime && (
          <div className="flex gap-1.5 web:gap-2 items-center">
            {/* //TODO: 무조건 면접이 아님 수정필요 */}
            <Badge label="면접시간" />
            <span className="text-black700 text-xxs web:text-xs">
              {endTime}
            </span>
          </div>
        )}
      </div>
      <div className="place-self-center text-black600 font-bold text-xxs web:text-sm xs:pr-3 pr-6 web:pr-[30px]">
        {steps}
      </div>
    </Link>
  );
};

export default ScheduleItem;
