import Detail from '@/components/detail/Detail';
import DetailNavBar from '@/components/navbar/DetailNavBar';
import { BASE_URL } from '@/constants/service';
import { authOptions } from '@/lib/authOptions';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

interface SchedulePageProps {
  params: {
    id: string;
  };
}

export default async function SchedulePage({
  params: { id },
}: SchedulePageProps) {
  const session = await getServerSession(authOptions);
  const token = session?.user.accessToken;

  if (!id) return notFound();

  const { data } = await axios.get(`${BASE_URL}/schedules/detail/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!data) return notFound();

  return (
    <>
      {<DetailNavBar {...data} />}
      <Detail {...data} />
    </>
  );
}
