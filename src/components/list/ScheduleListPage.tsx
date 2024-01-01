'use client';

import { ScheduleSimpleType } from '@/model/schedule';
import { useState } from 'react';
import useSWR from 'swr';
import FilterList from './FilterList';
import ListHeader, { EventType } from './TabHeader';

interface ListTypes {
  schedules: ScheduleSimpleType[];
  schedulesCount: {
    upcoming: number;
    past: number;
  };
}
//TODO: touch 이벤트 적용하기
const ScheduleListPage = () => {
  //TODO: 다가오는, 완료된 일정 Count API 연동
  const [tab, setTab] = useState<EventType>('upcoming');

  const handleSwitchTab = (type: EventType) => setTab(type);

  const { data, isLoading } = useSWR(`/api/schedules/list/${tab}`); //TODO: tab, date/createdAt abs, filter

  //TODO: api key context value로 전달
  return (
    <>
      <ListHeader
        current={tab}
        upcomingCount={data?.data.schedulesCount?.upcoming}
        pastCount={data?.data.schedulesCount?.past}
        onSwitch={handleSwitchTab}
      />
      <FilterList
        key={tab}
        tab={tab}
        list={data?.data.schedules}
        isLoading={isLoading}
      />
    </>
  );
};

export default ScheduleListPage;
