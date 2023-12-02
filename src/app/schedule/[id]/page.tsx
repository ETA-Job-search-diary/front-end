import Detail from '@/components/detail/Detail';
import DetailNavBar from '@/components/navbar/DetailNavBar';
import { getScheduleBy } from '@/service/schedule';
import { getToken } from '@/service/token';

import { notFound } from 'next/navigation';

interface SchedulePageProps {
  params: {
    id: string;
  };
}

export default async function SchedulePage({
  params: { id },
}: SchedulePageProps) {
  const { token } = await getToken();
  if (!id || !token) return notFound();

  const data = await getScheduleBy(id, token);

  return (
    <>
      <DetailNavBar {...data} />
      <Detail {...data} />
    </>
  );
}
