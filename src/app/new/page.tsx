import Form from '@/components/common/Form';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: '일정 등록',
};

export const viewport: Viewport = {
  themeColor: '#FFF',
  userScalable: false,
};

export default function NewPage() {
  return <Form />;
}
