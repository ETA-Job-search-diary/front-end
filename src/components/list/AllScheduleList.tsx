'use client';

import EmptyItem from '@/components/home/EmptyItem';
import FilterChips from '@/components/list/FilterChips';
import ScheduleList from '@/components/home/ScheduleList';
import ScheduleListHeader from '@/components/list/ScheduleListHeader';
import { useEffect, useState } from 'react';
import { useCheckDispatch } from '@/context/CheckContext';
import { ScheduleDetailType } from '@/model/schedule';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const AllScheduleList = () => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<ScheduleDetailType[]>([]);
  const [filter, setFilter] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const { onCheckToggle, onCheckAll } = useCheckDispatch();

  const total = data.length;
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

  useEffect(() => {
    if (!token) return;
    const getData = () =>
      axios
        .get(
          `http://track.bugilabs.com:3905/api/schedules/list?offset=${offset}${
            filter.length > 0 ? `&filter=${filter.join('&filter=')}` : ''
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    getData();
  }, [offset, filter]);

  return (
    <>
      <ScheduleListHeader
        count={total}
        isEdit={isEdit}
        onEditClick={handleEditToggle}
        onCheckToggle={handleCheckToggleAll}
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
        {data && !!total && <ScheduleList items={data} isEdit={isEdit} />}
        {token &&
          !total &&
          (isFiltered ? (
            <EmptyItem page="list" messageType="additional" border={false} />
          ) : (
            <EmptyItem page="list" messageType="empty" border={false} />
          ))}
        {!token && <EmptyItem page="list" messageType="empty" border={false} />}
      </section>
    </>
  );
};

export default AllScheduleList;
