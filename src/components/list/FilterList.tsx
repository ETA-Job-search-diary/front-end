import useScheduleList from '@/hook/scheduleList';
import useIntersectionObserver from '@/hook/useIntersectionObserver';
import useSession from '@/hook/useSession';
import useShowToast from '@/hook/useShowToast';
import {
  EditScheduleType,
  ScheduleDetailType,
  ScheduleStatusType,
} from '@/model/schedule';
import { useListStore } from '@/store/zustand';
import { useCallback, useState } from 'react';
import Alert, { AlertTypes } from '../common/Alert';
import Skeleton from '../common/Skeleton';
import CheckButton from './CheckButton';
import DateLine from './DateLine';
import EditButtons from './EditButtons';
import EmptyItem from './EmptyItem';
import GridChips from './GridChips';
import ScheduleItem from './ScheduleItem';
import { EventType } from './TabHeader';

interface FilterListProps {
  tab: EventType;
  list?: ScheduleDetailType[];
  isLoading?: boolean;
}

interface SubmitResultProps {
  id: string;
  data: EditScheduleType;
  token: string;
}

type AlertStatus = 'delete' | 'result';
export type SortTypes = 'latest' | 'createdAt';

const Message = {
  delete: '선택한 일정을 삭제할까요?',
  result: '해당전형에 합격하셨나요?',
};
//TODO: Refactoring 필요함
const FilterList = ({ tab }: FilterListProps) => {
  const {
    filter,
    sort,
    checkedIds,
    resultItem,
    setFilter: handleStepFilter,
    setSort: handleOrder,
    toggleCheck: handleCheck,
    unCheckAll,
    submitResult: submitResultClick,
  } = useListStore();

  const {
    data,
    nextPage,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    setDeleteSchedule,
    setEditSchedule,
  } = useScheduleList({ tab, filter, sort });

  const { showDeleteConfirmToast, showPassingRateToast } = useShowToast();

  const { token } = useSession();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [alertStatus, setAlertStatus] = useState<AlertStatus | null>(null);

  const handleEditStart = useCallback(() => setIsEdit(true), []);

  const handleDeleteAlert = useCallback(() => {
    setAlertStatus('delete');
  }, []);

  const closeAlert = () => setAlertStatus(null);

  const handleDeleteConfirm = async () => {
    if (!token) return;
    closeAlert();
    const res = await deleteSchedule(token);
    if (res) {
      showDeleteConfirmToast();
      unCheckAll();
    }
  };

  const deleteSchedule = (token: string) =>
    setDeleteSchedule(checkedIds, token);

  const handleResultBtnClick = (item: ScheduleDetailType) => {
    setAlertStatus('result');
    submitResultClick(item);
  };
  //TODO: sumbit 후 서버사이드로 된 상세 페이지 데이터 변경 필요함....
  const handleSubmitComplete = async (result: ScheduleStatusType) => {
    if (!token) return;
    closeAlert();
    const newResultItem = {
      step: resultItem?.step,
      company: resultItem?.company,
      position: resultItem?.position,
      date: resultItem?.date,
      link: resultItem?.link,
      platform: resultItem?.platform,
      memo: resultItem?.memo,
      status: result,
    };
    const res = await submitResult({
      id: checkedIds[0],
      data: newResultItem,
      token,
    });
    if (res) {
      showPassingRateToast();
      unCheckAll();
    }
  };

  const submitResult = ({ id, data, token }: SubmitResultProps) =>
    setEditSchedule(id, data, token);

  const handleEditComplete = useCallback(() => {
    unCheckAll();
    setIsEdit(false);
  }, []);

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
    result: [
      {
        value: 'FAIL',
        onClick: () => handleSubmitComplete('fail'),
      },
      {
        value: 'PASS',
        onClick: () => handleSubmitComplete('pass'),
      },
    ],
  };

  const { setTarget } = useIntersectionObserver({
    isReachingEnd,
    nextPage,
  });

  let lastMonth = '';

  return (
    <>
      <div className="flex flex-col gap-5 bg-white px-page pt-20">
        <GridChips checked={filter} onClick={handleStepFilter} />
        <EditButtons
          currentOrder={sort}
          isEdit={isEdit}
          onEdit={handleEditStart}
          onDelete={handleDeleteAlert}
          onCompleted={handleEditComplete}
          onOrder={handleOrder}
        />
        {isLoading && <Skeleton.List />}
        {!isLoading &&
          (!!data?.length ? (
            <>
              <ul className={`flex w-full flex-col gap-3`}>
                {data.map((item) => {
                  const month = item.date.slice(0, 7);
                  const isNewMonth = lastMonth !== month;
                  const isChecked = checkedIds.includes(item.id);
                  if (isNewMonth) lastMonth = month;
                  return (
                    <>
                      {isNewMonth && (
                        <DateLine key={month} date={month} tab={tab} />
                      )}
                      <li
                        key={item.id}
                        className={`items-center web:gap-3 ${
                          isEdit ? 'grid grid-cols-[20px_auto] gap-1' : ''
                        }`}
                      >
                        {isEdit && (
                          <CheckButton
                            checked={isChecked}
                            onClick={() => handleCheck(item.id)}
                          />
                        )}
                        {tab === 'coming' ? (
                          <ScheduleItem {...item} />
                        ) : (
                          <ScheduleItem.WithStatus
                            {...item}
                            tab={tab}
                            onResult={() => handleResultBtnClick(item)}
                          />
                        )}
                      </li>
                    </>
                  );
                })}
              </ul>
              {isLoadingMore && <Skeleton.Item />}
              <div
                ref={setTarget}
                className="pb-[calc(env(safe-area-inset-bottom)+90px)]"
              />
            </>
          ) : (
            <EmptyItem messageType={tab} />
          ))}
      </div>
      {alertStatus !== null && (
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
