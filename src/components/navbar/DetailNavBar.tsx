import Icon from '@/assets/Icon';
import Badge from '../common/Badge';
import BackButton from './BackButton';
import NavBar from '../common/NavBar';
import DetailMoreMenu from '../detail/DetailMoreMenu';

interface DetailNavBarProps {
  title: string;
  step: string;
  fullDate: string;
  day: string;
}

const DetailNavBar = ({ title, step, fullDate, day }: DetailNavBarProps) => {
  return (
    <div className="sticky top-0 bg-white/60 backdrop-blur-xl web:bg-white/70 web:backdrop-blur-2xl">
      <NavBar leftSection={<BackButton />} rightSection={<DetailMoreMenu />} />
      <div className="flex flex-col gap-2 pb-4 web:pb-[34px] border-b border-black100 mx-[22px] web:mx-[28px]">
        <div className="flex gap-3 items-center">
          <h1 className="text-black900 font-bold text-md web:text-xl">
            {title}
          </h1>
          <Badge label={step} />
        </div>
        <span className="text-black600 font-medium flex gap-2 items-center text-xxs web:text-sm">
          <Icon
            name="calendar"
            className="w-3 h-3 web:w-4 web:h-4 stroke-black600"
          />
          {fullDate}.{day}
        </span>
      </div>
    </div>
  );
};

export default DetailNavBar;
