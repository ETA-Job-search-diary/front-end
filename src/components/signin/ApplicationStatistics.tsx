import { STEP_STATISTICS } from '@/constants/form';
import StatisticsSection from './StatisticsSection';

export interface StatisticsProps {
  document: number;
  personality: number;
  interview: number;
  etc: number;
}

const ApplicationStatistics = (statistics: StatisticsProps) => {
  const COLUMN_COUNT = STEP_STATISTICS.length;

  return (
    <StatisticsSection label="application">
      <div
        className={`grid grid-cols-${COLUMN_COUNT} divide-x divide-black100 rounded-xl border border-black100 py-4 text-center`}
      >
        {STEP_STATISTICS.map(({ name, type }) => (
          <div>
            <p className="text-1 font-bold text-black800">{statistics[type]}</p>
            <p className="text-0.85 text-black600">{name}</p>
          </div>
        ))}
      </div>
    </StatisticsSection>
  );
};

export default ApplicationStatistics;
