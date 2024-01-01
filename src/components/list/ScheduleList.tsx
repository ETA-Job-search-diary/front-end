import { useCheckDispatch, useCheckState } from '@/context/CheckProvider';
import { ScheduleSimpleType } from '@/model/schedule';
import CheckButton from './CheckButton';
import DateLine from './DateLine';
import ScheduleItem from './ScheduleItem';
import { EventType } from './TabHeader';

interface ScheduleListProps {
  tab: EventType;
  items: ScheduleSimpleType[];
  isEdit?: boolean;
  onClick?: () => void;
}

const ScheduleList = ({ tab, items, isEdit, onClick }: ScheduleListProps) => {
  const { checkedIds } = useCheckState();
  const { onCheck } = useCheckDispatch();

  const isChecked = (id: string) => checkedIds.includes(id);
  const handleCheck = (id: string) => onCheck(id);
  const handlePass = () => onClick && onClick();

  let lastMonth = '';

  return (
    // TODO: pb 삭제
    <ul
      className={`flex w-full flex-col gap-3 pb-[calc(env(safe-area-inset-bottom)+90px)]`}
    >
      {items.map((item) => {
        const month = item.date.slice(0, 7);
        const isNewMonth = lastMonth !== month;
        if (isNewMonth) lastMonth = month;

        return (
          <>
            {isNewMonth && <DateLine key={month} date={month} tab={tab} />}
            <li
              key={item.id}
              className={`items-center web:gap-3 ${
                isEdit ? 'grid grid-cols-[20px_auto] gap-1' : ''
              }`}
            >
              {isEdit && (
                <CheckButton
                  checked={isChecked(item.id)}
                  onClick={() => handleCheck(item.id)}
                />
              )}
              {tab === 'upcoming' ? (
                <ScheduleItem {...item} />
              ) : (
                <ScheduleItem.WithStatus
                  {...item}
                  tab={tab}
                  onClick={handlePass}
                />
              )}
            </li>
          </>
        );
      })}
    </ul>
  );
};

export default ScheduleList;
