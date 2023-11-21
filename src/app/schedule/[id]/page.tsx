import Detail from '@/components/detail/Detail';
import DetailNavBar from '@/components/navbar/DetailNavBar';
import { authOptions } from '@/lib/authOptions';
import { getScheduleBy } from '@/service/schedule';
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

  if (!id || !token) return notFound();
  const data = await getScheduleBy(id, token);

  return (
    <>
      <DetailNavBar {...data} />
      <Detail {...data} />
    </>
  );
}
