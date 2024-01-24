import HomeCalendar from '@/components/home/HomeCalendar';
import HomeStatistics from '@/components/home/HomeStatistics';

export default function Home() {
  return (
    <section className="fixed top-0 flex h-[calc(100svh-5rem)] w-full min-w-280 max-w-500 flex-col justify-center bg-primary-500 px-page pt-safe-top web:static">
      <div className="flex h-max flex-col gap-2 overflow-y-auto pb-1 pt-[1px] scrollbar-none web:gap-3">
        <HomeCalendar />
        <HomeStatistics />
      </div>
    </section>
  );
}
