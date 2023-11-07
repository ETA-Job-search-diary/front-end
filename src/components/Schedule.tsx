import EmptyItem from './EmptyItem';
import ScheduleItem, { ScheduleItemProps } from './ScheduleItem';

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
      <div className="flex gap-[10px] text-sm web:text-xl">
        <span className="text-black900 font-bold">{week} 일정</span>
        <span className="text-black500">
          총 <span className="text-primary500 font-bold">{count}</span>건
        </span>
      </div>
      <ul className="flex flex-col gap-3">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id}>
              <ScheduleItem {...item} />
            </li>
          ))
        ) : (
          <EmptyItem />
        )}
      </ul>
    </section>
  );
};

export default Schedule;
