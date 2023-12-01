import Detail from '@/components/detail/Detail';
import DetailNavBar from '@/components/navbar/DetailNavBar';
import { authOptions } from '@/lib/authOptions';
import { getScheduleBy } from '@/service/schedule';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getFormattedISODateTime } from '@/service/date';

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

export async function generateMetadata({
  params: { id },
}: SchedulePageProps): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  const name = session?.user.name;
  const token = session?.user.accessToken;
  if (!id || !token) return notFound();
  const data = await getScheduleBy(id, token);

  return {
    title: `${data?.title}`,
    description: `${name}님의 일정 - 회사 : ${data?.company} | 직무 : ${
      data?.position
    } | 전형단계 : ${data?.step} | 일정 : ${
      getFormattedISODateTime(data?.date).date
    }`,
  };
}
