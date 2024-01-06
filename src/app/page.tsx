'use client';

import HomeCalendar from '@/components/home/HomeCalendar';
import StepStatistics from '@/components/signin/StepStatistics';
import useSWR from 'swr';

export default function Home() {
  const { data: statistics } = useSWR('/schedules/statistics');

  return (
    <section className="flex h-full min-h-screen flex-col justify-center gap-3 overflow-y-auto bg-primary-500 px-page pb-[calc(env(safe-area-inset-bottom)+90px)] pt-[calc(env(safe-area-inset-top)+0.2rem)]">
      <HomeCalendar />
      <StepStatistics statistics={statistics} variant="colorful" />
    </section>
  );
}
