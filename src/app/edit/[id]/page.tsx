import Form from '@/components/common/Form';
import { getScheduleBy } from '@/service/schedule';
import { getToken } from '@/service/token';
import { notFound } from 'next/navigation';

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditPage({ params: { id } }: EditPageProps) {
  const { token } = await getToken();

  if (!id || !token) return notFound();
  const data = await getScheduleBy(id, token);
  return <Form originData={data} />;
}
