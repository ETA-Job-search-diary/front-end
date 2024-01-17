import Icon from '@/assets/Icon';
import { ScheduleDetailType } from '@/model/schedule';
import {
  getFormattedDateTimeInfo,
  getFormattedISODateTime,
} from '@/service/date';
import { getStepByValue } from '@/service/form';
import Link from 'next/link';
import { MouseEvent } from 'react';
import Badge from '../common/Badge';
import CompleteButton from './CompleteButton';
import { EventType } from './TabHeader';

type ScheduleDate = Pick<ScheduleDetailType, 'date'>;

type ScheduleContent = Omit<ScheduleDetailType, 'status' | 'id' | 'date'> & {
  tab?: EventType;
};

interface ItemWithStatusProps extends ScheduleDetailType {
  tab: EventType;
  onResult?: () => void;
}
//TODO: Badge : 서류전형 이면서 00:00이면 안보이게
const ScheduleItem = ({
  id,
  step,
  company,
  position,
  date,
}: ScheduleDetailType) => {
  const { time } = getFormattedISODateTime(date);
  return (
    <Link
      href={`/schedule/${id}`}
      scroll={false}
      className={`grid grid-cols-[auto_1fr_auto] items-center whitespace-nowrap rounded-large border px-5 py-4 transition-colors ${borderStyle}`}
    >
      <ScheduleItem.Date date={date} />
      <ScheduleItem.Content {...{ company, position, step, date }} />
      {time !== '00:00' && <Badge hasIcon label={time} />}
    </Link>
  );
};

ScheduleItem.WithStatus = ({ ...props }: ItemWithStatusProps) => {
  const { id, step, company, position, date, status, onResult, tab } = props;
  const { time } = getFormattedISODateTime(date);

  const handleComplete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onResult?.();
  };

  return (
    <Link
      href={`/schedule/${id}`}
      scroll={false}
      className={`flex flex-col gap-3 rounded-large border px-5 py-4 transition-colors xs:gap-2 xs:px-3 ${borderStyle}`}
    >
      <div className="grid grid-cols-[auto_1fr_auto] whitespace-nowrap">
        <ScheduleItem.Date date={date} />
        <ScheduleItem.Content {...{ company, position, step, tab, date }} />
        {time !== '00:00' && <Badge hasIcon label={time} variant="fail" />}
      </div>
      <CompleteButton status={status} onClick={handleComplete} />
    </Link>
  );
};

ScheduleItem.Date = ({ date: dateInfo }: ScheduleDate) => {
  const { date, day } = getFormattedDateTimeInfo(dateInfo);
  return (
    <div
      className={`flex w-full flex-col items-center justify-center border-r pr-4 web:pr-6 ${borderStyle} ${accentStyle}`}
    >
      <div className="text-1.3 font-bold xs:text-1.1 web:text-1.5">{date}</div>
      <div className="text-0.85 web:text-0.95">{day}</div>
    </div>
  );
};

ScheduleItem.Content = ({
  company,
  position,
  step,
  tab = 'coming',
}: ScheduleContent) => {
  const formatStep = getStepByValue(step);
  return (
    <div className="flex w-full flex-col justify-between gap-1.5 overflow-hidden py-1.5 pl-4 pr-2 web:gap-2 web:pl-6">
      <div
        className={`truncate text-0.9 font-semibold leading-5 web:text-1 ${accentStyle}`}
      >
        {company} {formatStep}
      </div>
      <div className="flex items-center gap-1">
        <Icon
          name="briefcase"
          className={`h-2.5 w-2.5 web:h-4 web:w-4 ${
            tab === 'coming' ? 'stroke-primary-300' : 'stroke-black-300'
          }`}
        />
        <span className="truncate text-0.8 text-black-500 web:text-0.85">
          {position}
        </span>
      </div>
    </div>
  );
};
const borderStyle = 'border-black-100';
const accentStyle = 'text-black-900';

export default ScheduleItem;
