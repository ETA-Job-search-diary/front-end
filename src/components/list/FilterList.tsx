import { useCheckDispatch, useCheckState } from '@/context/CheckProvider';
import useShowToast from '@/hook/useShowToast';
import { ScheduleSimpleType } from '@/model/schedule';
import { useCallback, useState } from 'react';
import Alert, { AlertTypes } from '../common/Alert';
import Skeleton from '../common/Skeleton';
import EmptyItem from './EmptyItem';
import EditButtons from './EditButtons';
import GridChips from './GridChips';
import ScheduleList from './ScheduleList';
import { EventType } from './TabHeader';

interface FilterListProps {
  tab: EventType;
  list?: ScheduleSimpleType[];
  isLoading?: boolean;
}

type AlertStatus = 'delete' | 'complete';
export type AbsStatus = 'newest' | 'created';

const Message = {
  delete: '선택한 일정을 삭제할까요?',
  complete: '해당전형에 합격하셨나요?',
};

const FilterList = ({ tab, list, isLoading }: FilterListProps) => {
  const { showDeleteConfirmToast, showPassingRateToast } = useShowToast();

  const [filter, setFilter] = useState<string[]>([]);
  const [abs, setAbs] = useState<AbsStatus>('newest');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState<AlertStatus>('delete');

  // const {
  //   data,
  //   nextPage,
  //   isLoading,
  //   isLoadingMore,
  //   isReachingEnd,
  //   setDeleteSchedule,
  // } = useScheduleList(filter);

  // const isFiltered = !!filter.length;

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

  const handleOrder = (newAbs: AbsStatus) => {
    if (newAbs === 'newest' && abs === 'created') {
      setAbs('newest');
    } else if (newAbs === 'created' && abs === 'newest') {
      setAbs('created');
    }
    return;
  };

  const handleDeleteAlert = useCallback(() => {
    setAlertStatus('delete');
    setIsAlertOpen(true);
  }, []);

  const closeAlert = () => setIsAlertOpen(false);

  const handleDeleteConfirm = () => {
    console.log('일정 삭제');
    showDeleteConfirmToast();
    closeAlert();
    onUnCheckAll();
  };

  const handleComplete = useCallback(() => {
    onUnCheckAll();
    setIsEdit(false);
  }, []);

  // const { setTarget } = useIntersectionObserver({
  //   isReachingEnd,
  //   nextPage,
  // });

  const handleSubmitResult = () => {
    setAlertStatus('complete');
    setIsAlertOpen(true);
  };

  const handleSubmitComplete = () => {
    showPassingRateToast();
    closeAlert();
  };

  const AlertActions: Record<
    AlertStatus,
    {
      value: keyof typeof AlertTypes;
      onClick: () => void;
    }[]
  > = {
    delete: [
      {
        value: 'CANCEL',
        onClick: closeAlert,
      },
      {
        value: 'DELETE',
        onClick: handleDeleteConfirm,
      },
    ],
    complete: [
      {
        value: 'FAIL',
        onClick: handleSubmitComplete,
      },
      {
        value: 'PASS',
        onClick: handleSubmitComplete,
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col gap-5 bg-white px-[22px] pt-20 web:px-[28px]">
        <GridChips checked={filter} onClick={handleStepFilter} />
        <EditButtons
          currentOrder={abs}
          isEdit={isEdit}
          onEdit={handleEdit}
          onDelete={handleDeleteAlert}
          onCompleted={handleComplete}
          onOrder={handleOrder}
        />
        {/*
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
          ))} */}
        {isLoading && <Skeleton.List />}
        {!isLoading &&
          (!!list?.length ? (
            <ScheduleList
              tab={tab}
              items={list}
              isEdit={isEdit}
              onClick={handleSubmitResult}
            />
          ) : (
            <EmptyItem messageType={tab} />
          ))}
      </div>
      {isAlertOpen && (
        <Alert
          message={Message[alertStatus]}
          type={AlertActions[alertStatus]}
          onClose={closeAlert}
        />
      )}
    </>
  );
};

export default FilterList;
