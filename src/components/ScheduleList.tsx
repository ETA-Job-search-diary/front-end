import { data1, data2 } from '@/mock/data';
import Schedule, { WeekType } from './Schedule';

interface ScheduleListProps {}

const ScheduleList = ({}: ScheduleListProps) => {
  return (
    <section className="h-full flex flex-col gap-7 mx-[22px] web:mx-[28px] pb-[80px]">
      {/* //TODO: 이번주가 맞는지 확인하는 로직 필요하겠다 , 무한스크롤*/}
      <Schedule week={WeekType.this} items={data1} />
      <Schedule week={WeekType.next} items={[]} />
      {/* //TODO: 등록된 일정 아예 없으면 없으면 EmptyItem 컴포넌트 */}
    </section>
  );
};

export default ScheduleList;
