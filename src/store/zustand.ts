import { SortTypes } from '@/components/list/FilterList';
import { EventType } from '@/components/list/TabHeader';
import { StepTypes } from '@/model/schedule';
import { create } from 'zustand';

type ListStore = {
  tab: EventType;
  filter: StepTypes[];
  sort: SortTypes;
  checkedIds: string[];
  setTab: (tab: EventType) => void;
  setFilter: (filter: StepTypes) => void;
  setSort: (sort: SortTypes) => void;
  toggleCheck: (checkedIds: string) => void;
  removeAll: () => void;
};

export const useListStore = create<ListStore>((set) => ({
  tab: 'coming',
  filter: [],
  sort: 'newest',
  checkedIds: [],
  setTab: (tab: EventType) => {
    set({ tab });
    set({ filter: [] });
    set({ checkedIds: [] });
  },
  setFilter: (filter: StepTypes) => {
    const { filter: prevFilter } = useListStore.getState();
    const updateFilter = prevFilter.includes(filter)
      ? prevFilter.filter((item) => item !== filter)
      : [...prevFilter, filter];
    set({ filter: updateFilter });
  },
  setSort: (sort: SortTypes) => {
    const { sort: prevSort } = useListStore.getState();
    if (prevSort === sort) return;
    set({ sort: sort });
  },
  toggleCheck: (checkedIds: string) => {
    const { checkedIds: prevCheckedIds } = useListStore.getState();
    const updateCheckedIds = prevCheckedIds.includes(checkedIds)
      ? prevCheckedIds.filter((item) => item !== checkedIds)
      : [...prevCheckedIds, checkedIds];
    set({ checkedIds: updateCheckedIds });
  },
  removeAll: () => {
    set({ checkedIds: [] });
  },
}));
