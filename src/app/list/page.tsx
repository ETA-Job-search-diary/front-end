'use client';

import EmptyItem from '@/components/EmptyItem';
import FilterChips from '@/components/FilterChips';
import ScheduleList from '@/components/ScheduleList';
import ScheduleListHeader from '@/components/ScheduleListHeader';

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

  return (
    <>
      <ScheduleListHeader count={total} />
      <section className="pb-[80px] px-[22px] web:px-[28px] flex flex-col gap-5">
        <FilterChips checked={filter} onClick={handleFilter} />
        {<ScheduleList items={data2} />}
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
