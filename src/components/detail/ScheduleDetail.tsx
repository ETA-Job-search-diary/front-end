'use client';
import { BASE_URL } from '@/constants/service';
import Detail from '@/components/detail/Detail';
import DetailNavBar from '@/components/navbar/DetailNavBar';
import { ScheduleDetailType } from '@/model/schedule';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { notFound, redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ScheduleDetailProps {
  id: string;
}

const ScheduleDetail = ({ id }: ScheduleDetailProps) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  if (!token) {
    //TODO: 토큰 만료시 로그인 페이지로 이동
  }

  const [data, setData] = useState<ScheduleDetailType>();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/schedules/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return setData(res.data);
      } catch (err: any) {
        //TODO: 401: 토큰 만료, 404: 아이템 아이디 없음 에러처리 필요함
        return notFound();
      }
    };
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
