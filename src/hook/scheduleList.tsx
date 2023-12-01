import { ScheduleDetailType } from '@/model/schedule';
import { api } from '@/service/api';
import useSWR from 'swr';

const deleteSchedule = async (checkedIds: string[], token: string) => {
  return api('/schedules/deleteMany', 'post', token, { ids: checkedIds });
};

const useScheduleList = (filter: string[], offset: number) => {
  const { data, isLoading, error, mutate } = useSWR<ScheduleDetailType[]>([
    `/schedules/list?offset=${offset}${
      filter.length > 0 ? `&filter=${filter.join('&filter=')}` : ''
    }`,
  ]);

  const setDeleteSchedule = (checkedIds: string[], token: string) => {
    if (!checkedIds.length) return;
    const newSchedule = data?.filter((d) => !checkedIds.includes(d.id));
    return mutate(deleteSchedule(checkedIds, token), {
      optimisticData: newSchedule,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return {
    data,
    isLoading,
    error,
    setDeleteSchedule,
  };
};

export default useScheduleList;
