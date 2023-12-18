import Alert from '../common/Alert';
import EditButtons from './EditButtons';
import GridChips from './GridChips';
import useScheduleList from '@/hook/scheduleList';
import { useCheckDispatch, useCheckState } from '@/context/CheckProvider';
import { useCallback, useState } from 'react';
import Skeleton from '../common/Skeleton';
import EmptyItem from '../home/EmptyItem';
import useIntersectionObserver from '@/hook/useIntersectionObserver';
import ScheduleList from '../home/ScheduleList';
import useSession from '@/hook/useSession';
import useShowToast from '@/hook/useShowToast';

const FilterList = () => {
  const { token } = useSession();
  const { showDeleteConfirmToast } = useShowToast();

  const [filter, setFilter] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const {
    data,
    nextPage,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    setDeleteSchedule,
  } = useScheduleList(filter);

  const isFiltered = !!filter.length;

  const { allChecked, checkedIds } = useCheckState();
  const { onUnCheckAll } = useCheckDispatch();

  const handleStepFilter = useCallback(
    (step: string) =>
      setFilter((prevFilter) => {
        const updatedFilter = prevFilter.includes(step)
          ? prevFilter.filter((item) => item !== step)
          : [...prevFilter, step];
        return updatedFilter;
      }),
    [],
  );

  const handleEdit = useCallback(() => setIsEdit(true), []);

  const handleDeleteAlert = useCallback(() => setIsAlertOpen(true), []);

  const closeAlert = () => setIsAlertOpen(false);

  const handleDeleteConfirm = () => {
    if (!token || !checkedIds.length) return;
    setDeleteSchedule(checkedIds, token);
    showDeleteConfirmToast();
    closeAlert();
    onUnCheckAll();
  };

  const handleComplete = useCallback(() => {
    onUnCheckAll();
    setIsEdit(false);
  }, []);

  const { setTarget } = useIntersectionObserver({
    isReachingEnd,
    nextPage,
  });

  return (
    <>
      <div className="px-page flex flex-col gap-4 bg-white pt-6 web:px-[28px]">
        <GridChips checked={filter} onClick={handleStepFilter} />
        <EditButtons
          isEdit={isEdit}
          onEdit={handleEdit}
          onDelete={handleDeleteAlert}
          onCompleted={handleComplete}
        />
        {isLoading && <Skeleton.List />}
        {!isLoading &&
          (!!data?.length ? (
            <>
              <ScheduleList items={data} isEdit={isEdit} />
              {isLoadingMore && <Skeleton.Item />}
              <div
                ref={setTarget}
                className="pb-[calc(env(safe-area-inset-bottom)+90px)]"
              />
            </>
          ) : isFiltered ? (
            <EmptyItem page="list" messageType="additional" />
          ) : (
            <EmptyItem page="list" messageType="empty" />
          ))}
      </div>
      {isAlertOpen && (
        <Alert
          message={`선택한 일정을 삭제할까요?`}
          type={[
            {
              value: 'CANCEL',
              onClick: closeAlert,
            },
            {
              value: 'DELETE',
              onClick: handleDeleteConfirm,
            },
          ]}
          onClose={closeAlert}
        />
      )}
    </>
  );
};

export default FilterList;
