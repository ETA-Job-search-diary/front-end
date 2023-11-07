import Schedule, { WeekType } from './Schedule';

interface ScheduleListProps {}

const ScheduleList = ({}: ScheduleListProps) => {
  return (
    <section className="h-full flex flex-col gap-7 mx-[22px] web:mx-[28px] pb-[80px]">
      {/* //TODO: 이번주가 맞는지 확인하는 로직 필요하겠다 , 무한스크롤*/}
      <Schedule
        week={WeekType.this}
        items={[
          {
            id: '1',
            dateAt: '2023-11-07T10:00',
            title: '네이버 1차 면접',
            steps: '1차 면접',
            position: '데이터 분석',
            company: '네이버',
            endAt: '2023-11-07T14:00',
          },
        ]}
      />
      <Schedule
        week={WeekType.next}
        items={[
          {
            id: '1',
            dateAt: '2023-11-14T10:00',
            title: '네이버 1차 면접',
            steps: '1차 면접',
            position: '데이터 분석',
            company: '네이버',
            endAt: '2023-11-14T14:00',
          },
          {
            id: '1',
            dateAt: '2023-11-14T10:00',
            title: '네이버 2차 면접',
            steps: '2차 면접',
            position: '데이터 분석',
            company: '네이버',
            endAt: '2023-11-14T16:00',
          },
          {
            id: '1',
            dateAt: '2023-11-14T10:00',
            title: '네이버 1차 면접',
            steps: '1차 면접',
            position: '데이터 분석',
            company: '네이버',
            endAt: '2023-11-14T17:00',
          },
          {
            id: '1',
            dateAt: '2023-11-14T10:00',
            title: '네이버 1차 면접',
            steps: '1차 면접',
            position: '데이터 분석',
            company: '네이버',
            endAt: '2023-11-14T22:00',
          },
          {
            id: '1',
            dateAt: '2023-11-14T10:00',
            title: '네이버 1차 면접',
            steps: '1차 면접',
            position: '데이터 분석',
            company: '네이버',
            endAt: '2023-11-14T14:00',
          },
          {
            id: '1',
            dateAt: '2023-11-15T10:00',
            title: '네이버 1차 면접',
            steps: '1차 면접',
            position: '데이터 분석',
            company: '네이버',
            endAt: '2023-11-15T15:00',
          },
          {
            id: '1',
            dateAt: '2023-11-16T10:00',
            title: '네이버 1차 면접',
            steps: '1차 면접',
            position: '데이터 분석',
            company: '네이버',
            endAt: '2023-11-16T16:00',
          },
          {
            id: '1',
            dateAt: '2023-11-17T10:00',
            title: '네이버 1차 면접',
            steps: '1차 면접',
            position: '데이터 분석',
            company: '네이버',
            endAt: '2023-11-17T17:00',
          },
          {
            id: '1',
            dateAt: '2023-11-18T10:00',
            title: '네이버 1차 면접',
            steps: '1차 면접',
            position: '데이터 분석',
            company: '네이버',
            endAt: '',
          },
          {
            id: '1',
            dateAt: '2023-11-18T10:00',
            title: '네이버 1차 면접',
            steps: '1차 면접',
            position: '데이터 분석',
            company: '네이버',
            endAt: '2023-11-18T18:00',
          },
        ]}
      />
    </section>
  );
};

export default ScheduleList;
