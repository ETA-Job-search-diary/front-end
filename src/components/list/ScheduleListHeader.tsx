import Icon from '@/assets/Icon';
import SubScheduleTitle from './SubScheduleTitle';
import Button from '../common/Button';
import { useCheckDispatch, useCheckState } from '@/context/CheckContext';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Alert, { AlertType } from '../common/Alert';

interface ScheduleListHeaderProps {
  count: number;
  isEdit: boolean;
  onEditClick: () => void;
  onCheckToggle: () => void;
  onCheckAll: () => void;
}

const ScheduleListHeader = ({
  count,
  isEdit,
  onEditClick,
  onCheckToggle,
  onCheckAll,
}: ScheduleListHeaderProps) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string>();
  const { allChecked, checkedIds } = useCheckState();
  const { onUnCheckAll } = useCheckDispatch();

  const openMenu = () => setIsOpen(true);
  const handleCloseMenu = () => setIsOpen(false);

  const handleDeleteAll = () => {
    onCheckAll();
    setMessage('일정을 모두');
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
    if (!token) return;
    axios
      .post(
        `http://track.bugilabs.com:3905/api/schedules/deleteMany`,
        {
          data: {
            ids: checkedIds,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        handleCloseMenu();
        onUnCheckAll();
        // TODO: 삭제된 항목 제외한 아이템들만 보이게끔 해야됨.. (refetch요청 또는 mutation)
        // key: `http://track.bugilabs.com:3905/api/schedules/list?offset=${offset}${
        //   filter.length > 0 ? `&filter=${filter.join('&filter=')}` : ''
        // }`;
      })
      .catch((err) => console.log(err));
  };

  const handleComplete = () => {
    onUnCheckAll();
    onEditClick();
  };

  return (
    <>
      <header className="z-30 flex flex-col sticky top-0 bg-white/60 backdrop-blur-xl web:bg-white/70 web:backdrop-blur-2xl">
        <div className="z-40 pt-6 pb-4 px-[22px] web:px-[28px] bg-inherit">
          <div className="flex justify-between sticky top-0">
            <SubScheduleTitle label={'전체'} count={count} />
            {isEdit ? (
              <Button
                size="xxs"
                label="완료"
                color="border"
                onClick={handleComplete}
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
            <button type="button" onClick={onCheckToggle}>
              <Icon
                name="check"
                className={`w-3.5 h-3.5 web:w-5 web:h-5 ${
                  allChecked ? 'fill-primary500' : 'fill-black100'
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
            <Button
              size="xxs"
              label="전체삭제"
              color="border"
              onClick={handleDeleteAll}
            />
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
