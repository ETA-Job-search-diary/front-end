import SubScheduleTitle from './SubScheduleTitle';
import { useCheckDispatch, useCheckState } from '@/context/CheckContext';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Alert, { AlertType } from '../common/Alert';
import { useToast } from '@/components/ui/use-toast';
import CheckButton from '@/components/list/CheckButton';
import DeleteButtons from './DeleteButtons';
import ListEditButtons from './ListEditButtons';

interface ScheduleListHeaderProps {
  count?: number;
  isEdit: boolean;
  onEditClick: () => void;
  onCheckToggle: () => void;
  onDelete: (checkedIds: string[], token: string) => void;
  onCheckAll: () => void;
}

const ScheduleListHeader = ({
  count,
  isEdit,
  onEditClick,
  onCheckToggle,
  onDelete,
  onCheckAll,
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

  const handleDeleteAll = () => {
    setMessage('전체 일정을');
    onCheckAll();
    openMenu();
  };

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
      <header className="z-10 flex flex-col sticky top-0 bg-white">
        <div className="z-20 bg-white pt-[2rem] pb-2 px-[22px] web:px-[28px] flex justify-between sticky top-0">
          <SubScheduleTitle label={'전체'} count={token ? count : 0} />
          <ListEditButtons
            isEdit={isEdit}
            onEditClick={onEditClick}
            onEditComplete={handleComplete}
          />
        </div>
        <div
          className={`flex justify-between items-end sticky top-0 duration-300 ease-linear transition-all transform pb-1.5 web:pb-3 px-[22px] web:px-[28px] ${
            isEdit ? 'translate-y-0' : '-translate-y-24 h-0 opacity-0'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <CheckButton all checked={allChecked} onClick={onCheckToggle} />
            <span className="text-black900 text-sm xs:text-xxs font-bold">
              전체 선택
            </span>
          </div>
          <DeleteButtons
            onDeleteAll={handleDeleteAll}
            onDelete={handleDelete}
          />
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
