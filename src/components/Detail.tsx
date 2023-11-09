import Icon from '@/assets/Icon';
import { FormType } from '@/constants/form';

interface DetailProps {
  company: string;
  position: string;
  date: string;
  endTime: string;
  link: string;
  platform: string;
  memo: string;
}

const Detail = ({
  company,
  position,
  endTime,
  link,
  platform,
  memo,
}: DetailProps) => {
  return (
    <section className="w-full pb-[80px] px-[22px] web:px-[28px] flex flex-col gap-8 text-black-800 text-xs web:text-md pt-4 web:pt-8 scroll-auto">
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
    </section>
  );
};

export default Detail;
