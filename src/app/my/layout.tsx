import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '마이 페이지',
};

export const viewport: Viewport = {
  themeColor: 'var(--app-gray-100)',
};

interface MyLayoutProps {
  children: ReactNode;
}

const MyLayout = ({ children }: MyLayoutProps) => {
  return (
    <section className="h-full min-h-screen w-full bg-gray-100">
      {children}
    </section>
  );
};

export default MyLayout;
