import BackButton from '@/components/common/BackButton';
import { ReactNode } from 'react';

interface ListPagelayoutProps {
  children: ReactNode;
}

export default function ListPagelayout({ children }: ListPagelayoutProps) {
  return (
    <>
      <BackButton />
      <section className="min-h-screen web:min-h-full w-full px-[22px] web:px-[28px]">
        {children}
      </section>
    </>
  );
}
