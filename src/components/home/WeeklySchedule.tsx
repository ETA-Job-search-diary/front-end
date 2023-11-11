'use client';

import { useEffect, useState } from 'react';
import Schedule, { WeekType } from './Schedule';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { BASE_URL } from '@/constants/service';
import { WeeklyScheduleType } from '@/model/schedule';
import EmptyItem from './EmptyItem';
import { data1, data2 } from '@/mock/data';

interface ScheduleListProps {}

const WeeklySchedule = ({}: ScheduleListProps) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const [offset, setOffset] = useState(0);
  let [data, setData] = useState<WeeklyScheduleType>();

  data = {
    thisWeek: data1,
    nextWeek: data2,
  };

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
    <section className="h-full flex flex-col gap-7 mx-[22px] web:mx-[28px] pb-20">
      {token ? (
        <>
          {data ? (
            <>
              {data.thisWeek.length > 0 && (
                <Schedule week={WeekType.this} items={data.thisWeek} />
              )}
              {data.nextWeek.length > 0 && (
                <Schedule week={WeekType.next} items={data.nextWeek} />
              )}
            </>
          ) : (
            <EmptyItem page="home" messageType="additional" />
          )}
        </>
      ) : (
        <EmptyItem page="home" messageType="empty" />
      )}
    </section>
  );
};

export default WeeklySchedule;
