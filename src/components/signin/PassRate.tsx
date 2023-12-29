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
      <div className="border-black-100 flex flex-col gap-8 rounded-xl border bg-white p-5">
        <div className="flex flex-col gap-2">
          <p className="text-black-800 text-1">{`충분히 잘 하고 있어요!`}</p>
          <p className="text-black-500 text-0.9">{`취준로그와 함께 취뽀길만 걸어 보세요 :)`}</p>
        </div>
        <ul className={`grid grid-cols-${COLUMN_COUNT}`}>
          {STEP_RATE.map(({ type, name }) => (
            <li className="flex flex-col items-center justify-center">
              <DoughnutChart rate={rate[type]} label={name} />
            </li>
          ))}
        </ul>
      </div>
    </StatisticsSection>
  );
};

export default PassRate;
