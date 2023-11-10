'use client';

import EmptyItem from '@/components/home/EmptyItem';
import FilterChips from '@/components/list/FilterChips';
import ScheduleList from '@/components/home/ScheduleList';
import ScheduleListHeader from '@/components/list/ScheduleListHeader';

import { data2 } from '@/mock/data';
import { useState } from 'react';

export default function ListPage() {
  const total = data2.length;

  const [filter, setFilter] = useState<string[]>([]);

  const handleFilter = (value: string) => {
    const index = filter.indexOf(value);
    if (index === -1) {
      setFilter([...filter, value]);
    } else {
      const newFilter = [...filter];
      newFilter.splice(index, 1);
      setFilter(newFilter);
    }
    //TODO: Filter를 쿼리로 보내서 렌더링?
  };

  const [isEdit, setIsEdit] = useState(false); // isEdit 이면 ? 체크박스 보이게
  const [checked, setChecked] = useState<string[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false); // 전체선택시, true로 변경

  const handleCheckItem = (id: string) => {
    const index = checked.indexOf(id);
    if (index === -1) {
      setChecked([...checked, id]);
    } else {
      const newChecked = [...checked];
      newChecked.splice(index, 1);
      setChecked(newChecked);
    }
  };

  const handleCheckAll = () => {
    if (isAllChecked) {
      setChecked([]);
    } else {
      setChecked(data2.map((item) => item.id));
    }
    setIsAllChecked(!isAllChecked);
  };

  const handleEditToggle = () => setIsEdit((prev) => !prev);

  return (
    <>
      <ScheduleListHeader
        count={total}
        isEdit={isEdit}
        isAllChecked={isAllChecked}
        onEditClick={handleEditToggle}
        onCheckAll={handleCheckAll}
      />
      <section
        className={`px-[22px] web:px-[28px] flex flex-col gap-5 duration-300 ease-linear transition-all transform ${
          isEdit
            ? '-translate-y-[90px] xs:-translate-y-16'
            : 'translate-y-0 pb-20'
        }`}
      >
        <FilterChips isEdit={isEdit} checked={filter} onClick={handleFilter} />
        <ScheduleList
          items={data2}
          isEdit={isEdit}
          checked={checked}
          onCheck={handleCheckItem}
        />
        {!total &&
          (!!filter.length ? (
            <EmptyItem page="list" messageType="additional" />
          ) : (
            <EmptyItem page="list" messageType="empty" />
          ))}
      </section>
    </>
  );
}
