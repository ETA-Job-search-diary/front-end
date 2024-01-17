import HomeCalendar from '@/components/home/HomeCalendar';
import HomeStatistics from '@/components/home/HomeStatistics';

export default function Home() {
  return (
    <section className="scrollbar-none sticky top-0 flex h-full min-h-screen w-full flex-col justify-center gap-3 overflow-y-auto bg-primary-500 px-page pb-[calc(env(safe-area-inset-bottom)+90px)] pt-safe-top web:pt-2">
      <HomeCalendar />
      <HomeStatistics />
    </section>
  );
}
