import EmptyItem from './EmptyItem';
import ScheduleItem, { ScheduleItemProps } from './ScheduleItem';
import SubScheduleTitle from '../list/SubScheduleTitle';

export enum WeekType {
  this = '이번주',
  next = '다음주',
}

interface ScheduleProps {
  week: WeekType;
  items: ScheduleItemProps[];
}

const Schedule = ({ week, items }: ScheduleProps) => {
  const count = items.length;

  return (
    <section className="flex flex-col gap-2 web:gap-4">
      <SubScheduleTitle label={week} count={count} />
      <ul className="flex flex-col gap-3">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id}>
              <ScheduleItem {...item} />
            </li>
          ))
        ) : (
          <EmptyItem page="home" messageType="additional" />
        )}
      </ul>
    </section>
  );
};

export default Schedule;
