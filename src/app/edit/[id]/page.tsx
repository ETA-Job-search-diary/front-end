import Form from '@/components/common/Form';
import { METADATA, THEME_COLOR } from '@/constants/metadata';
import { getScheduleBy } from '@/service/schedule';
import { getToken } from '@/service/token';
import { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: METADATA.title.edit,
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR.default,
  userScalable: false,
};

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
