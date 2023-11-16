import Form from '@/components/common/Form';
import { authOptions } from '@/lib/authOptions';
import { getScheduleBy } from '@/service/schedule';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditPage({ params: { id } }: EditPageProps) {
  const session = await getServerSession(authOptions);
  const token = session?.user.accessToken;

  if (!id || !token) return notFound();
  const data = await getScheduleBy(id, token);
  return <Form originData={data} />;
}
