import { EditedScheduleType } from '@/components/common/Form';
import { SortTypes } from '@/components/list/FilterList';
import { EventType } from '@/components/list/TabHeader';
import { ScheduleDetailType, StepTypes } from '@/model/schedule';
import { api } from '@/service/api';
import { useCallback } from 'react';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

const DATA_LIMIT = 20;

interface ScheduleListHook {
  tab?: EventType;
  filter?: StepTypes[];
  sort?: SortTypes;
}

const deleteSchedule = async (checkedIds: string[], token: string) => {
  return api('/schedules/deleteMany', 'post', token, { ids: checkedIds });
};

const putSchedule = async (
  id: string,
  data: EditedScheduleType,
  token: string,
) => {
  return api(`/schedules/${id}`, 'put', token, data);
};

const useScheduleList = ({ tab, filter, sort }: ScheduleListHook) => {
  const filterQuery = filter ? `&filter=${filter.join('&filter=')}` : '';
  const tabQuery = tab === 'past' ? `&tab=${tab}` : '';
  const sortQuery = sort === 'createdAt' ? `&sort=${sort}` : '';

  const getKey: SWRInfiniteKeyLoader = (
    pageIndex: number,
    previousPageData: ScheduleDetailType[],
  ) => {
    if (
      (pageIndex > 0 && !previousPageData.length) ||
      (previousPageData && previousPageData.length < DATA_LIMIT)
    )
      return null;
    return `/schedules/list?offset=${
      pageIndex * DATA_LIMIT
    }${filterQuery}${sortQuery}${tabQuery}`;
  };

  const { data, size, setSize, isLoading, error, mutate } =
    useSWRInfinite<ScheduleDetailType[]>(getKey);

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');

  const isReachingEnd =
    !data?.[0]?.length || data?.[data.length - 1]?.length < DATA_LIMIT;

  const setDeleteSchedule = useCallback(
    (checkedIds: string[], token: string) => {
      if (!checkedIds.length) return;

      const newSchedule = data?.map((page) =>
        page.filter((schedule) => !checkedIds.includes(schedule.id)),
      );
      return mutate(deleteSchedule(checkedIds, token), {
        optimisticData: newSchedule,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [data, mutate],
  );

  const setEditSchedule = useCallback(
    (id: string, schedule: EditedScheduleType, token: string) => {
      const newSchedule = data?.map((page) => {
        return page.map((s) => (s.id === id ? { ...s, ...schedule } : s));
      });

      return mutate(putSchedule(id, schedule, token), {
        optimisticData: newSchedule,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [data, mutate],
  );

  return {
    data: data ? data.reduce((acc, page) => [...acc, ...(page ?? [])], []) : [],
    nextPage: () => setSize(size + 1),
    isLoading,
    isLoadingMore,
    isReachingEnd,
    error,
    mutate,
    setDeleteSchedule,
    setEditSchedule,
  };
};

export default useScheduleList;
