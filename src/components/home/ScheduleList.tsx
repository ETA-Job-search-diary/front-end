'use client';

import ScheduleItem from './ScheduleItem';
import { ScheduleSimpleType } from '@/model/schedule';
import { useCheckDispatch, useCheckState } from '@/context/CheckProvider';
import CheckButton from '../list/CheckButton';

interface ScheduleListProps {
  items: ScheduleSimpleType[];
  isEdit?: boolean;
}

const ScheduleList = ({ items, isEdit }: ScheduleListProps) => {
  const { checkedIds } = useCheckState();
  const { onCheck } = useCheckDispatch();

  const isChecked = (id: string) => checkedIds.includes(id);
  const handleCheck = (id: string) => onCheck(id);

  return (
    <ul className={`w-full flex flex-col gap-3`}>
      {items.map((item) => (
        <li
          key={item.id}
          className={`web:gap-3 items-center ${
            isEdit ? 'grid grid-cols-[20px_auto] gap-3.5' : ''
          }`}
        >
          {isEdit && (
            <CheckButton
              checked={isChecked(item.id)}
              onClick={() => handleCheck(item.id)}
            />
          )}
          <ScheduleItem {...item} />
        </li>
      ))}
    </ul>
  );
};

export default ScheduleList;
