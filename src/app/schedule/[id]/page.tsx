import ScheduleDetail from '@/components/detail/ScheduleDetail';
import { notFound } from 'next/navigation';
// import axios from 'axios';

interface SchedulePageProps {
  params: {
    id: string;
  };
}

export default function SchedulePage({
  params: { id },
}: SchedulePageProps) {
  // //TODO: 서버에서 데이터를 받아와서 렌더링 SSR해야되지 않을까..미리 패치하고 싶은데...!~!!!!
  // const data = await axios.get(
  //   `${BASE_URL}/schedules/detail/${id}`,
  // );
  // if (!id) return notFound();

  return <ScheduleDetail id={id} />;
}
