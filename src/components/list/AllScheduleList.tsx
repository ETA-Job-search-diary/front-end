'use client';

import EmptyItem from '@/components/home/EmptyItem';
import GridChips from '@/components/list/GridChips';
import ScheduleList from '@/components/home/ScheduleList';
import ScheduleListHeader from '@/components/list/ScheduleListHeader';
import { useState } from 'react';
import { useCheckDispatch } from '@/context/CheckProvider';
import Skeleton from '../common/Skeleton';
import useScheduleList from '@/hook/scheduleList';
import useIntersectionObserver from '@/hook/useIntersectionObserver';

const AllScheduleList = () => {
  const [filter, setFilter] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const { onCheckToggle, onCheckAll } = useCheckDispatch();

  const {
    data,
    nextPage,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    setDeleteSchedule,
  } = useScheduleList(filter);

  const isFiltered = !!filter.length;

  const handleFilter = (value: string) => {
    setFilter((prevFilter) => {
      const updatedFilter = prevFilter.includes(value)
        ? prevFilter.filter((item) => item !== value)
        : [...prevFilter, value];
      return updatedFilter;
    });
  };

  const handleEditToggle = () => setIsEdit((prev) => !prev);

  const handleCheckToggleAll = () => onCheckToggle(data.map((d) => d.id));

  const handleCheckAll = () => onCheckAll(data.map((d) => d.id));

  const { setTarget } = useIntersectionObserver({
    isReachingEnd,
    nextPage,
  });

  return (
    <>
      <ScheduleListHeader
        count={data?.length}
        isEdit={isEdit}
        onEditClick={handleEditToggle}
        onCheckToggle={handleCheckToggleAll}
        onDelete={setDeleteSchedule}
        onCheckAll={handleCheckAll}
      />
      <section
        className={`group grow bg-white pt-1 web:pt-0 px-[22px] web:px-[28px] flex flex-col gap-5 duration-300 ease-linear transition-all transform ${
          isEdit && '-translate-y-[90px] xs:-translate-y-16'
        }`}
      >
        <div
          className={`duration-300 ease-linear transition-all transform ${
            isEdit && 'opacity-0'
          }`}
        >
          <GridChips checked={filter} onClick={handleFilter} />
        </div>
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
      </section>
    </>
  );
};

export default AllScheduleList;
