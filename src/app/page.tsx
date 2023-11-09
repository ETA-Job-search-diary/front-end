import { Calender } from '@/components/home/Calendar';
import ScheduleList from '@/components/home/WeeklySchedule';
import ServiceBackground from '@/components/home/ServiceBackground';

export default function Home() {
  return (
    <>
      <ServiceBackground>
        {/* //TODO: 달력에만 스티키를 주는건 어떨까?? */}
        <Calender
          today={new Date()}
          events={[
            {
              title: 'test',
              from: '2023-09-01',
              to: '2023-09-07',
            },
            {
              title: 'test',
              from: '2023-11-07',
              to: '2023-11-07',
            },
            {
              title: 'test',
              from: '2023-11-14',
              to: '2023-11-20',
            },
          ]}
        />
      </ServiceBackground>
      <ScheduleList />
    </>
  );
}
