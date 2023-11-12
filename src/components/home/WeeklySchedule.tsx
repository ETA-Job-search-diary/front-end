'use client';

import { useState } from 'react';
import Schedule, { WeekType } from './Schedule';
import { useSession } from 'next-auth/react';
import { BASE_URL } from '@/constants/service';
import EmptyItem from './EmptyItem';
import useSWR from 'swr';
import { WeeklyScheduleType } from '@/model/schedule';
import Skeletone from '../common/Skeletone';

//TODO: 페이지 네이션 안했따,.,,
const WeeklySchedule = () => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const [offset, setOffset] = useState(0);
  const { data, isLoading, error } = useSWR<WeeklyScheduleType>([
    `${BASE_URL}/schedules/listByWeek?offset=${offset}`,
  ]);

  return (
    <section className="h-full flex flex-col gap-7 mx-[22px] web:mx-[28px]">
      {isLoading && (
        <>
          <Skeletone.Item />
        </>
      )}
      {!isLoading &&
        (token ? (
          <>
            {data && (data.thisWeek.length > 0 || data?.nextWeek.length > 0) ? (
              <>
                {data.thisWeek.length > 0 && (
                  <Schedule week={WeekType.this} items={data.thisWeek} />
                )}
                {data.nextWeek.length > 0 && (
                  <Schedule week={WeekType.next} items={data.nextWeek} />
                )}
              </>
            ) : (
              <div className="h-[30vh] w-full flex justify-center items-center">
                <EmptyItem page="home" messageType="additional" />
              </div>
            )}
          </>
        ) : (
          <div className="h-[30vh] w-full flex justify-center items-center">
            <EmptyItem page="home" messageType="empty" />
          </div>
        ))}
    </section>
  );
};

export default WeeklySchedule;
