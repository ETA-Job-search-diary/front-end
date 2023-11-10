'use client';

import Detail from '@/components/detail/Detail';
import DetailNavBar from '@/components/navbar/DetailNavBar';
import { ScheduleDetailType } from '@/model/schedule';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ScheduleDetailProps {
  id: string;
}

const ScheduleDetail = ({ id }: ScheduleDetailProps) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  if (!token) redirect('/'); //TODO: 로그인을 다시 해주세요...

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
          <DetailNavBar
            id={data.id}
            title={data.title}
            step={data.step}
            date={data.date}
          />
          <Detail {...data} />
        </>
      )}
    </>
  );
};

export default ScheduleDetail;
