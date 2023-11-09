import Icon from '@/assets/Icon';
import SubScheduleTitle from './SubScheduleTitle';
import Button from './common/Button';

interface ScheduleListHeaderProps {
  count: number;
  isEdit: boolean;
  isAllChecked?: boolean;
  onEditClick: () => void;
  onCheckAll?: () => void;
}

const ScheduleListHeader = ({
  count,
  isEdit,
  isAllChecked,
  onEditClick,
  onCheckAll,
}: ScheduleListHeaderProps) => {
  return (
    <header className="z-30 flex flex-col sticky top-0 bg-white/60 backdrop-blur-xl web:bg-white/70 web:backdrop-blur-2xl">
      <div className="z-40 pt-6 pb-4 px-[22px] web:px-[28px] bg-inherit">
        <div className="flex justify-between sticky top-0">
          <SubScheduleTitle label={'전체'} count={count} />
          {isEdit ? (
            <Button
              size="xxs"
              label="완료"
              color="border"
              onClick={onEditClick}
            />
          ) : (
            <Button
              size="xxs"
              label="편집"
              color="border"
              onClick={onEditClick}
            />
          )}
        </div>
      </div>
      <div
        className={`flex justify-between items-end sticky top-0 duration-200 ease-linear transition-all transform pb-3 px-[22px] web:px-[28px] ${
          isEdit ? 'translate-y-0' : '-translate-y-28 h-0 opacity-0'
        }`}
      >
        <div className="flex items-center gap-4 web:gap-3.5">
          <button type="button" onClick={onCheckAll}>
            <Icon
              name="check"
              className={`w-3.5 h-3.5 web:w-5 web:h-5 ${
                isAllChecked ? 'fill-primary500' : 'fill-black100'
              }`}
            />
          </button>
          <span className="text-black900 text-sm web:text-md font-bold">
            전체 선택
          </span>
          {/* //TODO: 기획 - 있어도 좋지않을까..! <span className="text-black900 text-xs web:text-sm font-bold">
                {checked.length} 개
              </span> */}
        </div>
        <div className="flex gap-3">
          <Button size="xxs" label="전체삭제" color="border" />
          <Button size="xxs" label="선택삭제" color="border" />
        </div>
      </div>
    </header>
  );
};

export default ScheduleListHeader;
