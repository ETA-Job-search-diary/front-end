import { getFormattedDateTimeInfo } from '@/service/date';
import Link from 'next/link';
// import Badge from '../common/Badge';
import Icon from '@/assets/Icon';
import { ScheduleSimpleType } from '@/model/schedule';
import { getStepByValue } from '@/service/form';
import { memo } from 'react';
import CompleteButton, { ScheduleStatus } from '../list/CompleteButton';
import { MouseEvent } from 'react';

type ScheduleDate = Pick<ScheduleSimpleType, 'date'>;

type ScheduleContentProps = Pick<
  ScheduleSimpleType,
  'company' | 'position' | 'step'
>;

interface ScheduleItemProps extends ScheduleSimpleType {
  status: ScheduleStatus;
  onClick: () => void;
}

const ScheduleItem = ({
  id,
  step,
  company,
  position,
  date: dateInfo,
}: ScheduleSimpleType) => {
  return (
    <Link
      href={`/schedule/${id}`}
      scroll={false}
      className={`grid grid-cols-[auto_1fr_auto] whitespace-nowrap rounded-large border px-6 py-3 transition-colors hover:bg-light ${borderStyle}`}
    >
      <ScheduleItem.Date date={dateInfo} />
      <ScheduleItem.Content {...{ company, position, step }} />
    </Link>
  );
};

ScheduleItem.WithStatus = ({ ...props }: ScheduleItemProps) => {
  const { id, step, company, position, date, status, onClick } = props;

  const handleComplete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick();
  };

  return (
    <Link
      href={`/schedule/${id}`}
      scroll={false}
      className={`flex flex-col rounded-large border px-6 py-3 transition-colors hover:bg-light ${borderStyle}`}
    >
      <div className="grid grid-cols-[auto_1fr_auto] whitespace-nowrap py-2">
        <ScheduleItem.Date date={date} />
        <ScheduleItem.Content {...{ company, position, step }} />
      </div>
      <CompleteButton status={status} onClick={handleComplete} />
    </Link>
  );
};

ScheduleItem.Date = ({ date: dateInfo }: ScheduleDate) => {
  const { date, day } = getFormattedDateTimeInfo(dateInfo);
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center border-r pr-5 ${borderStyle} ${accentStyle}`}
    >
      <h3 className="text-lg font-bold xs:text-sm web:text-xl">{date}</h3>
      <span className="text-xxs web:text-xs">{day}</span>
    </div>
  );
};

ScheduleItem.Content = ({ company, position, step }: ScheduleContentProps) => {
  const formatStep = getStepByValue(step);
  return (
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
  );
};

const borderStyle = 'border-black100';
const accentStyle = 'text-black900';

export default memo(ScheduleItem);
