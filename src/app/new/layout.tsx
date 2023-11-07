import BackButton from '@/components/common/BackButton';
import { ReactNode } from 'react';

interface NewPagelayoutProps {
  children: ReactNode;
}

export default function NewPagelayout({ children }: NewPagelayoutProps) {
  return (
    // TODO  스크롤을 위로할 때 뒤로가기 버튼보여지게 이벤트 적용하기, 내려갈땐 사라졌다가
    <>
      <BackButton />
      <section className="px-[22px] web:px-[28px]">{children}</section>
    </>
  );
}
