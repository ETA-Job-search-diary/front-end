import Detail from '@/components/Detail';
import DetailHeader from '@/components/DetailHeader';
import { getFormattedDate } from '@/service/date';
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
  const { fullDate, day, endTime } = getFormattedDate(mockData.date);

  return (
    <>
      <DetailHeader
        title={mockData.title}
        step={mockData.step}
        fullDate={fullDate}
        day={day}
      />
      <Detail {...mockData} endTime={endTime} />
    </>
  );
};

export default page;
