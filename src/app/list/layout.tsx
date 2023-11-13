import CheckProvider from '@/context/CheckContext';
import { ReactNode } from 'react';

interface ListPagelayoutProps {
  children: ReactNode;
}

export default function ListPagelayout({ children }: ListPagelayoutProps) {
  return (
    <section className="h-screen w-full flex flex-col pb-[calc(env(safe-area-inset-bottom)+90px)]">
      <CheckProvider>{children}</CheckProvider>
    </section>
  );
}
