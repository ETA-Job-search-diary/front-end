import ScheduleItem, { ScheduleItemProps } from './ScheduleItem';
interface ScheduleListProps {
  items: ScheduleItemProps[];
}

const ScheduleList = ({ items }: ScheduleListProps) => {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.id}>
          <ScheduleItem {...item} />
        </li>
      ))}
    </ul>
  );
};

export default ScheduleList;
