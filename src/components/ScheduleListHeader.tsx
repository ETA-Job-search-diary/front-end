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
    <div className="flex justify-between pt-9 pb-6 web:pt-10 web:pb-6 sticky top-0 bg-white/70 backdrop-blur-3xl px-[22px] web:px-[28px]">
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
