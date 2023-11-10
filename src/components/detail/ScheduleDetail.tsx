'use client';

import Detail from '@/components/detail/Detail';
import DetailNavBar from '@/components/navbar/DetailNavBar';
import { ScheduleDetailType } from '@/model/schedule';
import { getFormattedDate } from '@/service/date';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface ScheduleDetailProps {
  id: string;
  token: string;
}

const ScheduleDetail = ({ id, token }: ScheduleDetailProps) => {
  const [data, setData] = useState<ScheduleDetailType>();

  const { fullDate, day, endTime } = getFormattedDate(data?.date || '');

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`http://track.bugilabs.com:3905/api/schedules/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    };
    getData();
  }, []);

  return (
    <>
      {data && (
        <>
          <DetailNavBar
            title={data.title}
            step={data.step.name}
            fullDate={fullDate}
            day={day}
          />
          <Detail {...data} endTime={endTime} />
        </>
      )}
    </>
  );
};

export default ScheduleDetail;
