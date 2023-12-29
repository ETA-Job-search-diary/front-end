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
      <ul
        className={`grid grid-cols-${COLUMN_COUNT} divide-black-100 border-black-100 divide-x rounded-xl border py-4 text-center`}
      >
        {STEP_STATISTICS.map(({ name, type }) => (
          <li key={name}>
            <p className="text-black-800 text-1 font-bold">
              {statistics[type]}
            </p>
            <p className="text-black-600 text-0.85">{name}</p>
          </li>
        ))}
      </ul>
    </StatisticsSection>
  );
};

export default ApplicationStatistics;
