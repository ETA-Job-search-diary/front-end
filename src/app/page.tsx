import { Calender } from '@/components/home/Calendar';
import ServiceBackground from '@/components/home/ServiceBackground';

export default function Home() {
  return (
    <>
      <ServiceBackground>
        <Calender />
      </ServiceBackground>
    </>
  );
}
