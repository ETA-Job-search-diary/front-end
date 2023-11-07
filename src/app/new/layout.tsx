import { ReactNode } from 'react';

interface NewPagelayoutProps {
  children: ReactNode;
}
//TODO 버튼 맨 밑에 붙이는 방법 찾아보기
export default function NewPagelayout({ children }: NewPagelayoutProps) {
  return (
    <section className="min-h-screen web:min-h-full w-full px-[22px] web:px-[28px]">
      {children}
    </section>
  );
}
