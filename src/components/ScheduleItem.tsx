import { getFormattedDate } from '@/service/date';
import Link from 'next/link';
import Badge from './common/Badge';

export interface ScheduleItemProps {
  id: string;
  date: string;
  title: string;
  steps: string;
  position: string;
  company: string;
  endAt?: string;
}

const ScheduleItem = ({
  id,
  date,
  title,
  steps,
  position,
  company,
}: ScheduleItemProps) => {
  const { date: formattedDate, day, endTime } = getFormattedDate(date);

  //TODO: 일정 아이템 클릭시 상세 페이지로 이동하는 거 맞는지 확인
  return (
    <Link
      href={`/schedule/${id}`}
      className="whitespace-nowrap min-w-[250px] grid grid-cols-[auto_1fr_auto] border border-black100 rounded-large py-[18px] web:pt-[29px] web:pb-[23px] h-[88px] web:h-[129px]"
    >
      <div className="place-self-center flex flex-col items-center text-black900 px-6 web:px-[30px]">
        <h3 className="font-bold text-lg web:text-2xl">{formattedDate}</h3>
        <span className="text-xxs web:text-sm">{day}</span>
      </div>
      <div className="flex flex-col justify-center gap-1 web:gap-[14px]">
        <h3 className="text-black900 font-bold text-xs web:text-md leading-3">
          {title}
        </h3>
        <span className="text-black500 text-xxs web:text-sm leading-3">
          {position} | {company}
        </span>
        {endTime && (
          <div className="flex gap-1 web:gap-2 items-center">
            <Badge label="면접시간" />
            <span className="text-black700 text-xxs web:text-xs leading-3">
              {endTime}
            </span>
          </div>
        )}
      </div>
      <div className="place-self-center text-black600 font-bold text-xxs web:text-sm pr-6 web:pr-[30px]">
        {steps}
      </div>
    </Link>
  );
};

export default ScheduleItem;
