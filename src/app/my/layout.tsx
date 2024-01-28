import { METADATA, THEME_COLOR } from '@/constants/metadata';
import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: METADATA.title.my,
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR.my,
};

interface MyLayoutProps {
  children: ReactNode;
}

const MyLayout = ({ children }: MyLayoutProps) => {
  return (
    <section className="fixed top-0 h-full min-h-screen w-full min-w-280 max-w-500 overflow-y-auto bg-gray-100 scrollbar-none web:static">
      {children}
    </section>
  );
};

export default MyLayout;
