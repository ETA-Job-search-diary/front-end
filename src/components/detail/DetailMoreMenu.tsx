'use client';

import { useState } from 'react';
import Icon from '@/assets/Icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Alert, { alertTypes } from '../common/Alert';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { deleteSchedule } from '@/service/schedule';
import MoreMenuItem from './MoreMenuItem';

interface DetailMoreMenuProps {
  scheduleId: string;
}

const DetailMoreMenu = ({ scheduleId }: DetailMoreMenuProps) => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const handleCloseMenu = () => setIsOpen(false);

  const handleEditConfirm = () => {
    handleCloseMenu();
    push(`/edit/${scheduleId}`);
  };

  const handleDeleteConfirm = () => {
    if (!token) return;

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
            aria-label="=more-menu"
            name="moreVertical"
            className="mx-auto w-5 fill-none stroke-black900 transition-all hover:scale-110"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <MoreMenuItem label={alertTypes.EDIT} onClick={handleEditConfirm} />
          <DropdownMenuSeparator />
          <MoreMenuItem label={alertTypes.DELETE} onClick={openMenu} />
        </DropdownMenuContent>
      </DropdownMenu>
      {isOpen && (
        <Alert
          message={`등록된 일정을 ${alertTypes.DELETE}할까요?`}
          type={[
            {
              value: alertTypes.CANCEL,
              onClick: handleCloseMenu,
            },
            {
              value: alertTypes.DELETE,
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
