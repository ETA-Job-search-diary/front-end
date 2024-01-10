'use client';

import Icon from '@/assets/Icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useSession from '@/hook/useSession';
import useShowToast from '@/hook/useShowToast';
import { deleteSchedule } from '@/service/schedule';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Alert from '../common/Alert';
import MoreMenuItem from './MoreMenuItem';

interface DetailMoreMenuProps {
  scheduleId: string;
}

const DetailMoreMenu = ({ scheduleId }: DetailMoreMenuProps) => {
  const { push } = useRouter();
  const { token } = useSession();
  const { showDeleteConfirmToast } = useShowToast();

  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const handleCloseMenu = () => setIsOpen(false);

  const handleEditConfirm = () => {
    handleCloseMenu();
    push(`/edit/${scheduleId}`);
  };

  const handleDeleteConfirm = () => {
    if (!token) return;
    showDeleteConfirmToast();
    deleteSchedule(scheduleId, token)
      .then(() => {
        handleCloseMenu();
        push('/list');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="h-full w-full">
          <Icon
            name="moreVertical"
            className="mx-auto w-5 fill-none stroke-black-900 transition-all hover:scale-110"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <MoreMenuItem label={'수정'} onClick={handleEditConfirm} />
          <DropdownMenuSeparator />
          <MoreMenuItem label={'삭제'} onClick={openMenu} />
        </DropdownMenuContent>
      </DropdownMenu>
      {isOpen && (
        <Alert
          message={`등록된 일정을 삭제할까요?`}
          type={[
            {
              value: 'CANCEL',
              onClick: handleCloseMenu,
            },
            {
              value: 'DELETE',
              onClick: handleDeleteConfirm,
            },
          ]}
          onClose={handleCloseMenu}
        />
      )}
    </>
  );
};

export default DetailMoreMenu;
