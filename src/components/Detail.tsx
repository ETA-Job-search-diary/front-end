import Icon from '@/assets/Icon';
import { FormType } from '@/constants/form';
import { getFormattedDate } from '@/service/date';
import Badge from './common/Badge';

interface DetailProps {
  title: string;
  step: string;
  company: string;
  position: string;
  date: string;
  link: string;
  platform: string;
  memo: string;
}
//TODO: 분리하기
const Detail = ({
  title,
  step,
  company,
  position,
  date,
  link,
  platform,
  memo,
}: DetailProps) => {
  const { fullDate, day, endTime } = getFormattedDate(date);

  return (
    <>
      <div className="flex flex-col gap-2 px-2 pb-4 web:pb-[34px] border-b border-black100">
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
      <div className="flex flex-col gap-8 text-black-800 text-xs web:text-md pt-4 web:pt-8">
        <label className="grid grid-cols-[80px_auto] web:grid-cols-[auto_308px] gap-4">
          <span className="text-black-900 font-semibold flex gap-3 items-center whitespace-nowrap leading5">
            <Icon name="briefcase" className="w-3 h-3 web:w-4 web:h-4" />
            {FormType.COMPANY}
          </span>
          <span className="text-black600 font-medium">{company}</span>
        </label>
        <label className="grid grid-cols-[80px_auto] web:grid-cols-[auto_308px] gap-4">
          <span className="text-black-900 font-semibold flex gap-3 items-center whitespace-nowrap leading5">
            <Icon name="position" className="w-3 h-3 web:w-4 web:h-4" />
            {FormType.POSITION}
          </span>
          <span className="text-black600 font-medium">{position}</span>
        </label>
        <label className="grid grid-cols-[80px_auto] web:grid-cols-[auto_308px] gap-4">
          <span className="text-black-900 font-semibold flex gap-3 items-center whitespace-nowrap leading5">
            <Icon name="clock" className="w-3 h-3 web:w-4 web:h-4" />
            {FormType.DATE}
          </span>
          <span className="text-black600 font-medium">{endTime}</span>
        </label>
        <label className="grid grid-cols-[80px_auto] web:grid-cols-[auto_308px] gap-4">
          <span className="text-black-900 font-semibold flex gap-3 items-center whitespace-nowrap leading5">
            <Icon name="global" className="w-3 h-3 web:w-4 web:h-4" />
            {FormType.LINK}
          </span>
          <span className="text-black600 font-medium">{link}</span>
          <span className="text-black600 font-medium col-start-2">
            {platform}
          </span>
        </label>
        <label className="grid grid-cols-[80px_auto] web:grid-cols-[auto_308px] gap-4 items-start">
          <span className="text-black-900 font-semibold flex gap-3 items-center whitespace-nowrap leading5">
            <Icon name="memo" className="w-3 h-3 web:w-4 web:h-4" />
            {FormType.MEMO}
          </span>
          <span className="text-black600 font-medium">{memo}</span>
        </label>
      </div>
    </>
  );
};

export default Detail;
