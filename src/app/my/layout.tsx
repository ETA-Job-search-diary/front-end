import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '마이 페이지',
};

export const viewport: Viewport = {
  themeColor: '#FAFAFA',
};

interface MyLayoutProps {
  children: ReactNode;
}

const MyLayout = ({ children }: MyLayoutProps) => {
  return (
    <section className="scrollbar-none fixed h-full min-h-screen w-full min-w-280 max-w-500 overflow-x-hidden overflow-y-scroll bg-gray-100">
      {children}
    </section>
  );
};

export default MyLayout;
