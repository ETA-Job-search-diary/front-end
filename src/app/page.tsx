import { Calender } from '@/components/home/Calendar';
import WeeklySchedule from '@/components/home/WeeklySchedule';
import ServiceBackground from '@/components/home/ServiceBackground';

export default function Home() {
  return (
    <>
      <ServiceBackground>
        <Calender />
      </ServiceBackground>
      <WeeklySchedule />
    </>
  );
}
