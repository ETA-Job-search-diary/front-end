import { getStepByValue } from '@/service/form';
import Badge from '../common/Badge';
import NavBar from '../common/NavBar';
import DetailMoreMenu from '../detail/DetailMoreMenu';
import BackButton from './BackButton';

interface DetailNavBarProps {
  id: string;
  company: string;
  position: string;
  step: string;
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
    <>
      <NavBar
        className="sticky top-[calc(env(safe-area-inset-top))] bg-white"
        leftSection={<BackButton />}
        rightSection={<DetailMoreMenu scheduleId={id} />}
      />
      <div className="mx-page flex items-center gap-3 border-b border-black-100 pb-8 web:mx-7">
        <h1 className="text-1.2 font-bold text-black-900 web:text-1.5">
          {company} {position}
        </h1>
        {bagdeName && <Badge label={bagdeName} />}
        {(status === 'pass' || status === 'fail') && (
          <Badge label={status} variant={status} />
        )}
      </div>
    </>
  );
};

export default DetailNavBar;
