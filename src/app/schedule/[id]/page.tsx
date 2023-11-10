import ScheduleDetail from '@/components/detail/ScheduleDetail';
// import axios from 'axios';

interface SchedulePageProps {
  params: {
    id: string;
  };
}

export default async function SchedulePage({
  params: { id },
}: SchedulePageProps) {
  // //TODO: 서버에서 데이터를 받아와서 렌더링 SSR해야되지 않을까..미리 패치하고 싶은데...!~!!!!
  // const data = await axios.get(
  //   `http://track.bugilabs.com:3905/api/schedules/detail/${id}`,
  // );

  return <ScheduleDetail id={id} />;
}
