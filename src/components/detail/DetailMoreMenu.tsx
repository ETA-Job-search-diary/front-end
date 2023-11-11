'use client';
import { useToast } from '../ui/use-toast';
import { BASE_URL } from '@/constants/service';
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
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Menu = 'edit' | 'delete';

interface DetailMoreMenuProps {
  scheduleId: string;
}

const DetailMoreMenu = ({ scheduleId }: DetailMoreMenuProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<Menu>();

  const handleEdit = (value: Menu) => {
    setMessage(value);
    openMenu();
  };
  const handleDelete = (value: Menu) => {
    setMessage(value);
    openMenu();
  };

  const openMenu = () => setIsOpen(true);
  const handleCloseMenu = () => setIsOpen(false);

  const handleEditConfirm = () => {
    toast({
      title: '지금은 수정이 어려워요 🥹',
      description: '곧 업데이트 될 예정이니 잠시만 기다려주세요!',
    });
  };

  const handleDeleteConfirm = () => {
    if (!token) return;
    axios
      .delete(`${BASE_URL}/schedules/${scheduleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        handleCloseMenu();
        router.push('/list');
      })
      .catch((err) => console.log(err));
  };

  const MenuItem = {
    edit: {
      text: '수정',
      onClick: handleEdit,
    },
    delete: {
      text: '삭제',
      onClick: handleDelete,
    },
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full h-full">
          <span>
            <Icon
              name="moreVertical"
              className="stroke-black900 fill-none w-4 h-4 web:w-6 web:h-6 mx-auto hover:scale-110 transition-all"
            />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => MenuItem.edit.onClick('edit')}
            className="flex justify-center items-center gap-2"
          >
            <Icon name={'edit'} className="w-4 h-4 stroke-black600 fill-none" />
            <span className="text-xxs web:text-sm">
              {MenuItem.edit.text}하기
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => MenuItem.edit.onClick('delete')}
            className="flex justify-center items-center gap-2"
          >
            <Icon
              name={'delete'}
              className="w-4 h-4 stroke-black600 fill-none"
            />
            <span className="text-xxs web:text-sm">
              {MenuItem.delete.text}하기
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isOpen && message && (
        <Alert
          message={`등록된 일정을 ${AlertType[message]}할까요?`}
          type={[
            {
              value: AlertType.cancel,
              onClick: handleCloseMenu,
            },
            {
              value: AlertType[message],
              onClick:
                message === 'edit' ? handleEditConfirm : handleDeleteConfirm,
            },
          ]}
          onClose={handleCloseMenu}
        />
      )}
    </>
  );
};

export default DetailMoreMenu;
