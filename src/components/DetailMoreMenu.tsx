'use client';

import { Fragment, useState } from 'react';
import Icon from '@/assets/Icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Alert, { AlertType } from './common/Alert';

type Menu = 'edit' | 'delete';

const DetailMoreMenu = () => {
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

  const handleDeleteConfirm = () => {
    console.log('//TODO: 삭제 요청');
    handleCloseMenu();
  };

  const MenuItems: {
    type: Menu;
    text: string;
    onClick: (value: Menu) => void;
  }[] = [
    {
      type: 'edit',
      text: '수정',
      onClick: handleEdit,
    },
    {
      type: 'delete',
      text: '삭제',
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button type="button">
            <Icon
              name="moreVertical"
              className="stroke-black900 fill-none w-4 h-4 web:w-6 web:h-6 hover:scale-105 transition-all"
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {MenuItems.map(({ type, text, onClick }, index) => (
            <Fragment key={type}>
              <DropdownMenuItem
                onClick={() => onClick(type)}
                className="flex justify-center items-center gap-2"
              >
                <Icon
                  name={type}
                  className="w-4 h-4 stroke-black600 fill-none"
                />
                <span className="text-xxs web:text-sm">{text}하기</span>
              </DropdownMenuItem>
              {index === MenuItems.length - 1 || <DropdownMenuSeparator />}
            </Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {isOpen && message && (
        <Alert
          message={`등록된 일정을 ${AlertType[message]} 할까요?`}
          type={[
            {
              value: AlertType.cancel,
              onClick: handleCloseMenu,
            },
            {
              value: AlertType[message],
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
