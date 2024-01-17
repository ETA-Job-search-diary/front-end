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
    <section className="scrollbar-none web:scrollbar-thin flex min-h-screen w-full flex-col bg-gray-100 pt-safe-top">
      {children}
    </section>
  );
};

export default MyLayout;
