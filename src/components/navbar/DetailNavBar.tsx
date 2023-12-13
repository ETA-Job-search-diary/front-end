import Badge from '../common/Badge';
import BackButton from './BackButton';
import NavBar from '../common/NavBar';
import DetailMoreMenu from '../detail/DetailMoreMenu';
import { getStepByValue } from '@/service/form';

interface DetailNavBarProps {
  id: string;
  company: string;
  position: string;
  step: string;
}

const DetailNavBar = ({ id, company, position, step }: DetailNavBarProps) => {
  const bagdeName = getStepByValue(step);

  return (
    <div className="sticky top-0 bg-white">
      <NavBar
        leftSection={<BackButton />}
        rightSection={<DetailMoreMenu scheduleId={id} />}
      />
      <div className="mx-[22px] flex flex-col gap-2 border-b border-black100 pb-8 web:mx-[28px]">
        <div className="flex items-center gap-3">
          <h1 className="text-md font-bold text-black900 web:text-xl">
            {company} {position}
          </h1>
          {bagdeName && <Badge label={bagdeName} />}
        </div>
      </div>
    </div>
  );
};

export default DetailNavBar;
