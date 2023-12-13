import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '상세 일정',
  description: '상세 일정을 확인해보세요.',
};

interface DetaillayoutProps {
  children: ReactNode;
}
export default function Detaillayout({ children }: DetaillayoutProps) {
  return (
    <section className="min-h-screen w-full bg-white pb-[calc(env(safe-area-inset-bottom)+90px)] pt-[calc(env(safe-area-inset-top))] web:min-h-full">
      {children}
    </section>
  );
}
