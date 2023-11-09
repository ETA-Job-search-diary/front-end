'use client';

import Icon from '@/assets/Icon';
import ScheduleItem, { ScheduleItemProps } from './ScheduleItem';

interface ScheduleListProps {
  items: ScheduleItemProps[];
  isEdit?: boolean;
  checked?: string[]; // 리스트 페이지에서만 필요하기때문에, 여기서는 optional로 처리
  onCheck?: (id: string) => void;
}

const ScheduleList = ({
  items,
  isEdit,
  checked,
  onCheck,
}: ScheduleListProps) => {
  const isChecked = (id: string) => checked?.includes(id);
  const handleCheck = (id: string) => onCheck?.(id);

  return (
    <ul className="w-full flex flex-col gap-3 duration-500 ease-linear  transition-all">
      {items.map((item) => (
        <li
          key={item.id}
          className={`web:gap-3 items-center duration-500 ease-linear  transition-all ${
            isEdit ? 'grid grid-cols-[20px_auto] gap-1' : ''
          }`}
        >
          {isEdit && (
            <button type="button" onClick={() => handleCheck(item.id)}>
              <Icon
                name="check"
                className={`w-3.5 h-3.5 web:w-5 web:h-5 hover:animate-wiggle duration-300 ease-linear transition-all ${
                  isChecked(item.id) ? 'fill-primary500' : 'fill-black100'
                }`}
              />
            </button>
          )}
          <ScheduleItem {...item} />
        </li>
      ))}
    </ul>
  );
};

export default ScheduleList;
