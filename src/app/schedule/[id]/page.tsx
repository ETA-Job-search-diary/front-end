import BackButton from '@/components/BackButton';
import Detail from '@/components/Detail';
import DetailMoreMenu from '@/components/DetailMoreMenu';
import NavBar from '@/components/common/NavBar';
interface pageProps {
  params: {
    id: string;
  };
}

const mockData = {
  title: '네이버 1차 면접',
  step: '1차면접',
  company: '네이버',
  position: '데이터분석',
  date: '2023-11-21T22:30',
  link: 'link',
  platform: 'platform',
  memo: '- 1차 면접 전 직무분석 내용 다시 한번 확인',
};

const page = ({ params: { id } }: pageProps) => {
  return (
    <>
      <NavBar leftSection={<BackButton />} rightSection={<DetailMoreMenu />} />
      <section className="min-h-screen web:min-h-full w-full px-[22px] web:px-[28px]">
        <Detail {...mockData} />
      </section>
    </>
  );
};

export default page;
