import Icon from '@/assets/Icon';
import SubScheduleTitle from './SubScheduleTitle';
import Button from '../common/Button';
import { useCheckDispatch, useCheckState } from '@/context/CheckContext';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Alert, { AlertType } from '../common/Alert';
import { useToast } from '@/components/ui/use-toast';

interface ScheduleListHeaderProps {
  count?: number;
  isEdit: boolean;
  onEditClick: () => void;
  onCheckToggle: () => void;
  onDelete: (checkedIds: string[], token: string) => void;
}

const ScheduleListHeader = ({
  count,
  isEdit,
  onEditClick,
  onCheckToggle,
  onDelete,
}: ScheduleListHeaderProps) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string>();
  const { allChecked, checkedIds } = useCheckState();
  const { onUnCheckAll } = useCheckDispatch();

  const openMenu = () => setIsOpen(true);
  const handleCloseMenu = () => setIsOpen(false);

  const handleDelete = () => {
    if (checkedIds.length === 0) return;
    if (checkedIds.length === count && checkedIds.length !== 1) {
      setMessage('일정을 모두');
    } else setMessage('선택한 일정을');
    openMenu();
  };

  const handleDeleteConfirm = () => {
    if (!token || !checkedIds.length) return;
    onDelete && onDelete(checkedIds, token);
    deleteToast();
    handleCloseMenu();
    onUnCheckAll();
  };

  const deleteToast = () =>
    toast({
      description: '삭제되었습니다.',
    });

  const handleComplete = () => {
    onUnCheckAll();
    onEditClick();
  };

  return (
    <>
      <header className="z-30 flex flex-col sticky top-0 bg-white">
        <div className="z-40 pt-[2rem] pb-2 web:pb-3 px-[22px] web:px-[28px] bg-inherit">
          <div className="flex justify-between sticky top-0">
            <SubScheduleTitle label={'전체'} count={token ? count : 0} />
            {isEdit ? (
              <Button
                size="xs"
                label="완료"
                color="primary-border"
                onClick={handleComplete}
              />
            ) : (
              <Button
                size="xs"
                label="편집"
                color="primary-border"
                onClick={onEditClick}
              />
            )}
          </div>
        </div>
        <div
          className={`flex justify-between items-end sticky top-0 duration-300 ease-linear transition-all transform pb-1.5 web:pb-3 px-[22px] web:px-[28px] ${
            isEdit ? 'translate-y-0' : '-translate-y-24 h-0 opacity-0'
          }`}
        >
          <div className="flex items-center gap-4 web:gap-3.5">
            <button type="button" onClick={onCheckToggle}>
              <Icon
                aria-label="all-check"
                name="check"
                className={`w-3.5 h-3.5 web:w-5 web:h-5 ${
                  allChecked ? 'fill-primary500' : 'fill-black100'
                }`}
              />
            </button>
            <span className="text-black900 text-sm xs:text-xs font-bold">
              전체 선택
            </span>
          </div>
          <div className="flex gap-3">
            <Button
              size="xxs"
              label="선택삭제"
              color="border"
              onClick={handleDelete}
            />
          </div>
        </div>
      </header>
      {isOpen && (
        <Alert
          message={`${message} ${AlertType.delete}할까요?`}
          type={[
            {
              value: AlertType.cancel,
              onClick: handleCloseMenu,
            },
            {
              value: AlertType.delete,
              onClick: handleDeleteConfirm,
            },
          ]}
          onClose={handleCloseMenu}
        />
      )}
    </>
  );
};

export default ScheduleListHeader;
