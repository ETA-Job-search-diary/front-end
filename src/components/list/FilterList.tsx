import { useSession } from 'next-auth/react';
import Alert, { alertTypes } from '../common/Alert';
import EditButtons from './EditButtons';
import GridChips from './GridChips';
import { useToast } from '../ui/use-toast';
import useScheduleList from '@/hook/scheduleList';
import { useCheckDispatch, useCheckState } from '@/context/CheckProvider';
import { useCallback, useState } from 'react';
import Skeleton from '../common/Skeleton';
import EmptyItem from '../home/EmptyItem';
import useIntersectionObserver from '@/hook/useIntersectionObserver';
import ScheduleList from '../home/ScheduleList';
import { TOAST_MESSAGE } from '@/constants/toast';

const FilterList = () => {
  const [filter, setFilter] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const { toast } = useToast();

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
    deleteToast();
    closeAlert();
    onUnCheckAll();
  };

  const handleComplete = useCallback(() => {
    onUnCheckAll();
    setIsEdit(false);
  }, []);

  const deleteToast = () =>
    toast({
      description: TOAST_MESSAGE.DELETE,
    });

  const { setTarget } = useIntersectionObserver({
    isReachingEnd,
    nextPage,
  });

  return (
    <>
      <div className="flex flex-col gap-4 px-[22px] pt-6 web:px-[28px]">
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
          message={`선택한 일정을 ${alertTypes.DELETE}할까요?`}
          type={[
            {
              value: alertTypes.CANCEL,
              onClick: closeAlert,
            },
            {
              value: alertTypes.DELETE,
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
