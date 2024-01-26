import { ReactNode } from 'react';

const StatisticsLabel = {
  rate: '나의 합격률',
  application: '나의 지원 현황',
  etc: '기타/문의',
};

interface StatisticsSectionProps {
  title: keyof typeof StatisticsLabel;
  subSection?: ReactNode;
  children: ReactNode;
}

const StatisticsSection = ({
  title,
  subSection,
  children,
}: StatisticsSectionProps) => {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-1 pl-1 text-black-900">
        <h1 className="whitespace-nowrap text-1 font-semibold">
          {StatisticsLabel[title]}
        </h1>
        {subSection && subSection}
      </div>
      {children}
    </section>
  );
};

export default StatisticsSection;
