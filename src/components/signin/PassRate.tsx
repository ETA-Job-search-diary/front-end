import Icon from '@/assets/Icon';
import { STEP_RATE } from '@/constants/form';
import { useListStore } from '@/store/zustand';
import { useRouter } from 'next/navigation';
import Tooltip from '../common/Tooltip';
import DoughnutChart from './DoughnutChart';
import StatisticsSection from './StatisticsSection';

export interface PassRateProps {
  document: RateTypes;
  interview: RateTypes;
  total: RateTypes;
}

type RateTypes = {
  passRate: number;
  totalCount: number;
  totalPassCount: number;
};

const PassRate = (rate: PassRateProps) => {
  const COLUMN_COUNT = STEP_RATE.length;

  const { push } = useRouter();
  const handleSwitchTab = useListStore((state) => state.setTab);
  const handleDayClick = () => {
    handleSwitchTab('past');
    push('/list');
  };

  return (
    <StatisticsSection
      title="rate"
      subSection={
        <div className="flex w-full items-center justify-between">
          <Tooltip
            message={`완료된 일정에 입력한 합격여부를\n바탕으로 집계된 합격률이에요`}
          >
            <Icon name="helpcircle" className="h-4 w-4 stroke-black-400" />
          </Tooltip>
          <button
            onClick={handleDayClick}
            className="flex items-center gap-0.5 text-0.8"
          >
            <span>합격여부 입력하기</span>
            <Icon name="chevronRight" className="h-4 w-4 stroke-black-500" />
          </button>
        </div>
      }
    >
      <ul
        className={`grid grid-cols-${COLUMN_COUNT} rounded-xl border border-black-100 bg-white p-5 xs:px-0 xs:py-2`}
      >
        {STEP_RATE.map(({ type, name }) => (
          <li key={name} className="flex flex-col items-center justify-center">
            <DoughnutChart
              rate={Math.ceil(rate?.[type]?.passRate * 100)}
              label={name}
            />
          </li>
        ))}
      </ul>
    </StatisticsSection>
  );
};

export default PassRate;
