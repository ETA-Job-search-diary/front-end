'use client';

import { useState } from 'react';
import Schedule from './Schedule';
import EmptyItem from './EmptyItem';
import useSWR from 'swr';
import { WeeklyScheduleType } from '@/model/schedule';
import Skeleton from '../common/Skeleton';
import useSession from '@/hook/useSession';

const WeeklySchedule = () => {
  const { token } = useSession();
  const [offset, setOffset] = useState(0);
  const { data, isLoading, error } = useSWR<WeeklyScheduleType>([
    `/schedules/listByWeek?offset=${offset}`,
  ]);

  return (
    <section
      className={`px-page flex h-full w-full grow overflow-auto bg-white pb-[calc(env(safe-area-inset-bottom)+90px)] web:px-[28px] ${
        isLoading || !!data?.thisWeek.length || !!data?.nextWeek.length
          ? ''
          : 'items-center justify-center'
      }`}
    >
      {isLoading && <Skeleton.Item />}
      {!isLoading &&
        (!!token ? (
          data && (data.thisWeek.length > 0 || data?.nextWeek.length > 0) ? (
            <div className="flex w-full flex-col gap-8">
              {data.thisWeek.length > 0 && (
                <Schedule week="THIS" items={data.thisWeek} />
              )}
              {data.nextWeek.length > 0 && (
                <Schedule week="NEXT" items={data.nextWeek} />
              )}
            </div>
          ) : (
            <EmptyItem page="home" messageType="additional" />
          )
        ) : (
          <EmptyItem page="home" messageType="empty" />
        ))}
    </section>
  );
};

export default WeeklySchedule;
