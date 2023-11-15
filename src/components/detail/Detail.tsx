import { FormType } from '@/constants/form';
import { getFormattedDate } from '@/service/date';
import DetailItem from './DetailItem';

interface DetailProps {
  company: string;
  position: string;
  date: string;
  link?: string;
  platform?: string;
  memo?: string;
}

const Detail = ({
  company,
  position,
  date,
  link,
  platform,
  memo,
}: DetailProps) => {
  const { endTime } = getFormattedDate(date);

  return (
    <section className="w-full h-full px-[22px] web:px-[28px] flex flex-col gap-7 text-black-800 text-xs web:text-md pt-4 web:pt-8 scroll-auto">
      <DetailItem title={FormType.COMPANY} icon="briefcase" content={company} />
      <DetailItem
        title={FormType.POSITION}
        icon="position"
        content={position}
      />
      <DetailItem title={FormType.DATE} icon="clock" content={endTime} />
      {link !== ' ' && (link || platform) && (
        <DetailItem.Link
          title={FormType.LINK}
          icon="global"
          content={platform}
          link={link}
        />
      )}
      {memo !== ' ' && memo && (
        <DetailItem.MarkDown title={FormType.MEMO} icon="memo" content={memo} />
      )}
    </section>
  );
};

export default Detail;
