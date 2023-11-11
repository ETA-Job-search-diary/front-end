import NewNavBar from '@/components/navbar/NewNavBar';
import { ReactNode } from 'react';

interface NewPagelayoutProps {
  children: ReactNode;
}

export default function NewPagelayout({ children }: NewPagelayoutProps) {
  return (
    <div className="bg-white">
      <NewNavBar />
      <section className="px-[22px] web:px-[28px]">{children}</section>
    </div>
  );
}
