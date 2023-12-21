'use client';

import { useState } from 'react';
import ListHeader, { TabTypes } from './TabHeader';
import FilterList from './FilterList';

const ScheduleListPage = () => {
  //TODO: 다가오는, 완료된 일정 Count API 연동
  const [tab, setTab] = useState<TabTypes>('upcoming');

  const handleSwitchTab = (type: TabTypes) => setTab(type);

  //TODO: api key context value로 전달
  return (
    <>
      <ListHeader
        current={tab}
        counts={{
          upcoming: 0,
          past: 0,
        }}
        onSwitch={handleSwitchTab}
      />
      <FilterList key={tab} />
    </>
  );
};

export default ScheduleListPage;
