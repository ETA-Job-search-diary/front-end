import SubScheduleTitle from './SubScheduleTitle';
import Button from './common/Button';

interface ScheduleListHeaderProps {
  count: number;
  isEdit: boolean;
  onEditClick: () => void;
}

const ScheduleListHeader = ({
  count,
  isEdit,
  onEditClick,
}: ScheduleListHeaderProps) => {
  return (
    <div className="z-30 flex justify-between pt-9 mb-2.5 pb-3.5 web:pt-7 web:mb-2 web:pb-5 sticky top-0 bg-white/60 backdrop-blur-xl web:bg-white/70 web:backdrop-blur-2xl px-[22px] web:px-[28px]">
      <SubScheduleTitle label={'전체'} count={count} />
      {isEdit ? (
        <Button size="xxs" label="완료" color="border" onClick={onEditClick} />
      ) : (
        <Button size="xxs" label="편집" color="border" onClick={onEditClick} />
      )}
    </div>
  );
};

export default ScheduleListHeader;
