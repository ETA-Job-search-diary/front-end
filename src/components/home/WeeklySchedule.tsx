'use client';

import { useEffect, useState } from 'react';
import Schedule, { WeekType } from './Schedule';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { BASE_URL } from '@/constants/service';
import { WeeklyScheduleType } from '@/model/schedule';
import EmptyItem from './EmptyItem';

interface ScheduleListProps {}

const WeeklySchedule = ({}: ScheduleListProps) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<WeeklyScheduleType>();

  useEffect(() => {
    if (!token) return;
    const getData = () =>
      axios
        .get(`${BASE_URL}/schedules/listByWeek?offset=${offset}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    getData();
  }, []);

  return (
    <section className="h-full flex flex-col gap-7 mx-[22px] web:mx-[28px]">
      {token ? (
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
            <div className="h-[calc(100vh-30rem)] web:h-[calc(100vh-50rem)] w-full flex justify-center items-center">
              <EmptyItem page="home" messageType="additional" />
            </div>
          )}
        </>
      ) : (
        <div className="h-[calc(100vh-30rem)] web:h-[calc(100vh-50rem)] w-full flex justify-center items-center">
          <EmptyItem page="home" messageType="empty" />
        </div>
      )}
    </section>
  );
};

export default WeeklySchedule;
