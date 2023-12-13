import Icon from '@/assets/Icon';
import Badge from '../common/Badge';
import BackButton from './BackButton';
import NavBar from '../common/NavBar';
import DetailMoreMenu from '../detail/DetailMoreMenu';
import { getFormattedDateTimeInfo } from '@/service/date';
import { getBadgeByStep } from '@/service/form';

interface DetailNavBarProps {
  id: string;
  step: string;
  date: string;
}

const DetailNavBar = ({ id, step, date }: DetailNavBarProps) => {
  const { fullDate, day } = getFormattedDateTimeInfo(date);
  const bagdeName = getBadgeByStep(step);

  return (
    <div className="sticky top-0 bg-white">
      <NavBar
        leftSection={<BackButton />}
        rightSection={<DetailMoreMenu scheduleId={id} />}
      />
      <div className="mx-[22px] flex flex-col gap-2 border-b border-black100 pb-8 web:mx-[28px]">
        <div className="flex items-center gap-3">
          {/* <h1 className="text-black900 font-bold text-md web:text-xl">
            {title}
          </h1> */}
          {bagdeName && <Badge label={bagdeName} />}
        </div>
        <span className="flex items-center gap-2 text-form font-medium text-black600">
          <Icon name="calendar" className="h-4 w-4 stroke-black600" />
          {fullDate}.{day}
        </span>
      </div>
    </div>
  );
};

export default DetailNavBar;
