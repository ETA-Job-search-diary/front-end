import ScheduleItem from './ScheduleItem';
import SubScheduleTitle from '../list/SubScheduleTitle';
import { ScheduleSimpleType } from '@/model/schedule';

const WeekTypes = {
  THIS: '이번주',
  NEXT: '다음주',
};

interface ScheduleProps {
  week: keyof typeof WeekTypes;
  items: ScheduleSimpleType[];
}

const Schedule = ({ week, items }: ScheduleProps) => {
  const count = items.length;
  if (!count) return null;

  return (
    <section className="flex flex-col gap-2 web:gap-4">
      <SubScheduleTitle label={WeekTypes[week]} count={count} />
      <ul className={`flex flex-col gap-3`}>
        {items.map((item) => (
          <li key={item.id}>
            <ScheduleItem {...item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Schedule;
