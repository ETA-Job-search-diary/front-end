import NavBar from '@/components/common/NavBar';
import BackButton from '@/components/navbar/BackButton';
import { ReactNode } from 'react';

interface NewPagelayoutProps {
  children: ReactNode;
}

export default function NewPagelayout({ children }: NewPagelayoutProps) {
  return (
    <div className="bg-white">
      <div className="sticky top-0 bg-white">
        <NavBar label="일정수정" leftSection={<BackButton />} />
      </div>
      <section className="px-[22px] web:px-[28px]">{children}</section>
    </div>
  );
}
