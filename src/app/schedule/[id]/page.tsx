import ScheduleDetail from '@/components/detail/ScheduleDetail';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface SchedulePageProps {
  params: {
    id: string;
  };
}

export default async function SchedulePage({
  params: { id },
}: SchedulePageProps) {
  const session = await getServerSession();

  if (!session) redirect('/signin');
  const token = session.user.accessToken;

  return <ScheduleDetail id={id} token={token} />;
}
