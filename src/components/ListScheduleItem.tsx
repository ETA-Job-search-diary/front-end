import ScheduleItem, { ScheduleItemProps } from './ScheduleItem';

interface ListScheduleItemProps {
  items: ScheduleItemProps[];
}

const ListScheduleItem = ({ items }: ListScheduleItemProps) => {
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

export default ListScheduleItem;
