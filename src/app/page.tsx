import HomeCalendar from '@/components/home/HomeCalendar';

export default function Home() {
  return (
    <section className="fixed top-0 flex h-[calc(100vh-5rem)] w-full min-w-280 max-w-500 flex-col justify-center bg-primary-500 bg-gradient-to-b from-transparent from-50% to-white to-50% pt-safe-top web:static ">
      <div className="h-max overflow-y-auto scrollbar-none">
        <HomeCalendar />
      </div>
    </section>
  );
}
