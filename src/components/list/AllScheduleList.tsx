'use client';

import EmptyItem from '@/components/home/EmptyItem';
import GridChips from '@/components/list/GridChips';
import ScheduleList from '@/components/home/ScheduleList';
import ScheduleListHeader from '@/components/list/ScheduleListHeader';
import { useState } from 'react';
import { useCheckDispatch } from '@/context/CheckContext';
import Skeletone from '../common/Skeletone';
import useScheduleList from '@/hook/scheduleList';

const AllScheduleList = () => {
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const { onCheckToggle } = useCheckDispatch();

  const { data, isLoading, setDeleteSchedule } = useScheduleList(
    filter,
    offset,
  );

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

  const handleCheckToggleAll = () =>
    data && onCheckToggle(data.map((d) => d.id));

  return (
    <>
      <ScheduleListHeader
        count={data?.length}
        isEdit={isEdit}
        onEditClick={handleEditToggle}
        onCheckToggle={handleCheckToggleAll}
        onDelete={setDeleteSchedule}
      />
      <section
        className={`group grow bg-white pt-1 web:pt-0 px-[22px] web:px-[28px] flex flex-col gap-5 duration-300 ease-linear transition-all transform ${
          isEdit ? '-translate-y-[90px] xs:-translate-y-16' : 'translate-y-0'
        }`}
      >
        <div
          className={`duration-300 ease-linear transition-all transform ${
            isEdit ? 'opacity-0' : ''
          }`}
        >
          <GridChips checked={filter} onClick={handleFilter} />
        </div>
        {isLoading && <Skeletone.List />}
        {!isLoading &&
          (!!data?.length ? (
            <ScheduleList items={data} isEdit={isEdit} />
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
