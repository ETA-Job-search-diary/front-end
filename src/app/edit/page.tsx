interface EditPageProps {
  params: {
    id: string;
  };
}

export default function EditPage({ params: { id } }: EditPageProps) {
  // 데이터를 다 받아올지? 아니면 필요한 데이터만 받아올지?
  return <div>수정페이지</div>;
}
