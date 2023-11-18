'use client';

import { useState } from 'react';
import Icon from '@/assets/Icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Alert, { AlertType } from '../common/Alert';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { deleteSchedule } from '@/service/schedule';

enum Menu {
  edit = '수정',
  delete = '삭제',
}

interface DetailMoreMenuProps {
  scheduleId: string;
}

const DetailMoreMenu = ({ scheduleId }: DetailMoreMenuProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const handleCloseMenu = () => setIsOpen(false);

  const handleEditConfirm = () => {
    handleCloseMenu();
    router.push(`/edit/${scheduleId}`);
  };

  const handleDeleteConfirm = () => {
    if (!token) return;

    deleteSchedule(scheduleId, token)
      .then(() => {
        handleCloseMenu();
        router.push('/list');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full h-full">
          <Icon
            aria-label="=more-menu"
            name="moreVertical"
            className="stroke-black900 fill-none w-5 mx-auto hover:scale-110 transition-all"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={handleEditConfirm}
            className="flex justify-center items-center gap-2"
          >
            <Icon name={'edit'} className="w-4 h-4 stroke-black600 fill-none" />
            <span className="text-xxs web:text-sm">{Menu.edit}하기</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={openMenu}
            className="flex justify-center items-center gap-2"
          >
            <Icon name={'delete'} className="w-4 h-4 stroke-black600" />
            <span className="text-xxs web:text-sm">{Menu.delete}하기</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isOpen && (
        <Alert
          message={`등록된 일정을 ${Menu.delete}할까요?`}
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

export default DetailMoreMenu;
