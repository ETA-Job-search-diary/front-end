import Form from '@/components/common/Form';
import { METADATA, THEME_COLOR } from '@/constants/metadata';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: METADATA.title.new,
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR.default,
  userScalable: false,
};

export default function NewPage() {
  return <Form />;
}
