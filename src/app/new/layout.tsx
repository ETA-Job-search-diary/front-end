import BackButton from '@/components/common/BackButton';
import { ReactNode } from 'react';

interface NewPagelayoutProps {
  children: ReactNode;
}
//TODO 버튼 맨 밑에 붙이는 방법 찾아보기
export default function NewPagelayout({ children }: NewPagelayoutProps) {
  return (
    <section className="min-h-screen web:min-h-full w-full px-[22px] web:px-[28px]">
      {/* //TODO  스크롤을 위로할 때 뒤로가기 버튼보여지게 이벤트 적용하기, 내려갈땐 사라졌다가 */}
      <BackButton />
      {children}
    </section>
  );
}
