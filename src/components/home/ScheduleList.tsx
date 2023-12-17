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
    <ul className={`flex w-full flex-col gap-3`}>
      {items.map((item) => (
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
          <ScheduleItem {...item} />
        </li>
      ))}
    </ul>
  );
};

export default ScheduleList;

// TODO: pending 상태이면, 합격하셨나요? 버튼을 보여준다. (합격, 불합격)
// 합격을 누르면 pass 상태로 바뀌고, 불합격을 누르면 fail 상태로 바뀐다. POST /schedule/:id/status, body: { status: 'pass' | 'fail' }
