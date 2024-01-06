import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '다가오는 일정',
  description: '다가오는 일정을 확인해보세요. 당신의 취뽀를 응원합니다:)',
};

export const viewport: Viewport = {
  themeColor: 'var(--app-white)',
};

interface ListPagelayoutProps {
  children: ReactNode;
}

export default function ListPagelayout({ children }: ListPagelayoutProps) {
  return (
    <section className="flex h-screen w-full flex-col bg-white pt-safe-top">
      {children}
    </section>
  );
}
