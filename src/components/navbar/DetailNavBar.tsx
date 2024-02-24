import { StepTypes } from '@/model/schedule';
import { getStepByValue } from '@/service/form';
import Badge from '../common/Badge';
import NavBar from '../common/NavBar';
import DetailMoreMenu from '../detail/DetailMoreMenu';
import BackButton from './BackButton';

interface DetailNavBarProps {
  id: string;
  company: string;
  position: string;
  step: StepTypes;
  status: string;
}

const DetailNavBar = ({
  id,
  company,
  position,
  step,
  status,
}: DetailNavBarProps) => {
  const bagdeName = getStepByValue(step);

  return (
    <div className="sticky top-0 z-20 h-full w-full bg-white pt-safe-top">
      <NavBar
        leftSection={<BackButton />}
        rightSection={<DetailMoreMenu scheduleId={id} />}
      />
      <div className="mx-page flex items-center gap-3 border-b border-black-100 px-2 pb-6">
        <h1 className="grow text-1.2 font-bold text-black-900 web:text-1.5">
          {company} {position}
        </h1>
        {bagdeName && <Badge label={bagdeName} />}
        {(status === 'pass' || status === 'fail') && (
          <Badge label={status} variant={status} />
        )}
      </div>
    </div>
  );
};

export default DetailNavBar;
