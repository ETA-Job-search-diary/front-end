import BackButton from '@/components/common/BackButton';
import NavBar from '@/components/common/NavBar';
import { ReactNode } from 'react';

interface NewPagelayoutProps {
  children: ReactNode;
}

export default function NewPagelayout({ children }: NewPagelayoutProps) {
  return (
    <>
      <NavBar leftSection={<BackButton />} />
      <section className="px-[22px] web:px-[28px]">{children}</section>
    </>
  );
}
