import Icon from '@/assets/Icon';
import { STEP_RATE } from '@/constants/form';
import Tooltip from '../common/Tooltip';
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
    <StatisticsSection
      label="rate"
      icon={
        <Tooltip
          message={`완료된 일정에 입력한 합격여부를\n바탕으로 집계된 합격률이에요`}
        >
          <Icon name="helpcircle" className="h-4 w-4" />
        </Tooltip>
      }
    >
      <ul
        className={`grid grid-cols-${COLUMN_COUNT} rounded-xl border border-black-100 bg-white p-5`}
      >
        {STEP_RATE.map(({ type, name }) => (
          <li key={name} className="flex flex-col items-center justify-center">
            <DoughnutChart rate={rate[type]} label={name} />
          </li>
        ))}
      </ul>
    </StatisticsSection>
  );
};

export default PassRate;
