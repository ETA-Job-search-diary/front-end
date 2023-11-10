'use client';

import Detail from '@/components/detail/Detail';
import DetailNavBar from '@/components/navbar/DetailNavBar';
import { ScheduleDetailType } from '@/model/schedule';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface ScheduleDetailProps {
  id: string;
}

const ScheduleDetail = async ({ id }: ScheduleDetailProps) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const [data, setData] = useState<ScheduleDetailType>();

  useEffect(() => {
    const getData = () =>
      axios
        .get(`http://track.bugilabs.com:3905/api/schedules/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    getData();
  }, []);

  return (
    <>
      {data && (
        <>
          <DetailNavBar title={data.title} step={data.step} date={data.date} />
          <Detail {...data} />
        </>
      )}
    </>
  );
};

export default ScheduleDetail;
