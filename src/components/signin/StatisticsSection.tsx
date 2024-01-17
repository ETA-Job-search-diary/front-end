import { ReactNode } from 'react';

const StatisticsLabel = {
  rate: '나의 합격률',
  application: '나의 지원 현황',
  etc: '기타/문의',
};

interface StatisticsSectionProps {
  label: keyof typeof StatisticsLabel;
  icon?: ReactNode;
  children: ReactNode;
}

const StatisticsSection = ({
  label,
  icon,
  children,
}: StatisticsSectionProps) => {
  return (
    <section className="flex flex-col gap-3">
      <h1 className="flex items-center gap-1 pl-1 text-1 font-semibold text-black-900">
        {StatisticsLabel[label]}
        {icon && icon}
      </h1>
      {children}
    </section>
  );
};

export default StatisticsSection;
