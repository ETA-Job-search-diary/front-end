import { STEP_RATE } from '@/constants/form';
import DoughnutChart from './DoughnutChart';
import StatisticsSection from './StatisticsSection';

export interface PassRateProps {
  document: number;
  interview: number;
  total: number;
}

const PassRate = (rate: PassRateProps) => {
  const COLUMN_COUNT = STEP_RATE.length;

  return (
    <StatisticsSection label="rate">
      <div className={`grid grid-cols-${COLUMN_COUNT}`}>
        {STEP_RATE.map(({ type, name }) => (
          <div className="flex w-full flex-col items-center justify-center">
            <DoughnutChart rate={rate[type]} />
            <span className="text-0.8 text-black700">{name}</span>
          </div>
        ))}
      </div>
    </StatisticsSection>
  );
};

export default PassRate;
