import { ReactNode } from 'react';

const StatisticsLabel = {
  rate: '나의 합격률',
  application: '나의 지원 현황',
};

interface StatisticsSectionProps {
  label: keyof typeof StatisticsLabel;
  children: ReactNode;
}

const StatisticsSection = ({ label, children }: StatisticsSectionProps) => {
  return (
    <section className="flex flex-col gap-2">
      <h1 className="text-1 font-semibold text-black900">
        {StatisticsLabel[label]}
      </h1>
      {children}
    </section>
  );
};

export default StatisticsSection;
