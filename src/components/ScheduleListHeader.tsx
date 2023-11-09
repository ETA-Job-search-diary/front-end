import { useCallback, useState } from 'react';
import EditButton from './EditButton';
import SubScheduleTitle from './SubScheduleTitle';

interface ScheduleListHeaderProps {
  count: number;
}

const ScheduleListHeader = ({ count }: ScheduleListHeaderProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = useCallback(() => setIsEdit(true), []);

  const handleDelete = useCallback(() => {}, []);

  const handleConfirm = useCallback(() => {}, []);

  return (
    <div className="flex justify-between pt-9 mb-2.5 pb-3.5 web:pt-7 web:mb-2 web:pb-5 sticky top-0 bg-white/60 backdrop-blur-xl web:bg-white/70 web:backdrop-blur-2xl px-[22px] web:px-[28px]">
      <SubScheduleTitle label={'전체'} count={count} />
      <EditButton
        isEdit={isEdit}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default ScheduleListHeader;
