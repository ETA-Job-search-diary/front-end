import { ReactNode } from 'react';

interface ListPagelayoutProps {
  children: ReactNode;
}

export default function ListPagelayout({ children }: ListPagelayoutProps) {
  return (
    <>
      <section className="min-h-screen web:min-h-full w-full px-[22px] web:px-[28px]">
        {children}
      </section>
    </>
  );
}
