'use client';

import { useState } from 'react';
import ListHeader, { EventType } from './TabHeader';
import FilterList from './FilterList';

const ScheduleListPage = () => {
  //TODO: 다가오는, 완료된 일정 Count API 연동
  const [tab, setTab] = useState<EventType>('UPCOMING');

  const handleSwitchTab = (type: EventType) => setTab(type);

  //TODO: api key context value로 전달
  return (
    <>
      <ListHeader
        current={tab}
        upcomingCount={1}
        completedCount={1}
        onSwitch={handleSwitchTab}
      />
      <FilterList key={tab} />
    </>
  );
};

export default ScheduleListPage;
