'use client';

import { useListStore } from '@/store/zustand';
import FilterList from './FilterList';
import ListHeader from './TabHeader';

const ScheduleListPage = () => {
  const currentTab = useListStore((state) => state.tab);
  const handleSwitchTab = useListStore((state) => state.setTab);

  //TODO: api key context value로 전달
  return (
    <>
      <ListHeader current={currentTab} onSwitch={handleSwitchTab} />
      <FilterList key={currentTab} tab={currentTab} />
    </>
  );
};

export default ScheduleListPage;
