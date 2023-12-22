import { STEP_RATE } from '@/constants/form';
import DoughnutChart from './DoughnutChart';
import StatisticsSection from './StatisticsSection';
import Tooltip from '../common/Tooltip';
import Icon from '@/assets/Icon';

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
      <ul className={`grid grid-cols-${COLUMN_COUNT}`}>
        {STEP_RATE.map(({ type, name }) => (
          <li
            key={name}
            className="flex w-full flex-col items-center justify-center"
          >
            <DoughnutChart rate={rate[type]} />
            <span className="text-0.8 text-black700">{name}</span>
          </li>
        ))}
      </ul>
    </StatisticsSection>
  );
};

export default PassRate;
