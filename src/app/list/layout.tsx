import CheckProvider from '@/context/CheckProvider';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '다가오는 일정',
  description: '다가오는 일정을 확인해보세요. 당신의 취뽀를 응원합니다:)',
};

interface ListPagelayoutProps {
  children: ReactNode;
}

export default function ListPagelayout({ children }: ListPagelayoutProps) {
  return (
    <section className="flex h-screen w-full flex-col pb-[calc(env(safe-area-inset-bottom)+90px)]">
      <CheckProvider>{children}</CheckProvider>
    </section>
  );
}
