import ServiceSubtitle from '@/components/ServiceSubtitle';
import BackButton from '@/components/common/BackButton';
import Form from '@/components/common/Form';

export default function NewPage() {
  return (
    <>
      {/* //TODO  스크롤을 위로할 때 뒤로가기 버튼보여지게 이벤트 적용하기, 내려갈땐 사라졌다가 */}
      <BackButton />
      <ServiceSubtitle />
      <Form />
    </>
  );
}
