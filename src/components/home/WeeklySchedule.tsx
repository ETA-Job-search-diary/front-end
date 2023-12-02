'use client';

import { useState } from 'react';
import Schedule from './Schedule';
import { useSession } from 'next-auth/react';

import EmptyItem from './EmptyItem';
import useSWR from 'swr';
import { WeeklyScheduleType } from '@/model/schedule';
import Skeletone from '../common/Skeletone';

const WeeklySchedule = () => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const [offset, setOffset] = useState(0);
  const { data, isLoading, error } = useSWR<WeeklyScheduleType>([
    `/schedules/listByWeek?offset=${offset}`,
  ]);

  return (
    <section
      className={`grow h-full w-full bg-white px-[22px] web:px-[28px] flex overflow-auto pb-[calc(env(safe-area-inset-bottom)+90px)] ${
        isLoading || !!data?.thisWeek.length || !!data?.nextWeek.length
          ? ''
          : 'justify-center items-center'
      }`}
    >
      {isLoading && <Skeletone.Item />}
      {!isLoading &&
        (!!token ? (
          data && (data.thisWeek.length > 0 || data?.nextWeek.length > 0) ? (
            <div className="w-full flex flex-col gap-8">
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
