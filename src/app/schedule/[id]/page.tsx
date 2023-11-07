interface pageProps {
  params: {
    id: string;
  };
}

const page = ({ params: { id } }: pageProps) => {
  return <div>일정 상세 페이지</div>;
};

export default page;
