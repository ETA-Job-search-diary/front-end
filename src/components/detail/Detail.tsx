import { formatDateTimeDetails } from '@/service/date';
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
  const { fullDate, shortWeekDay, hours12 } = formatDateTimeDetails(date);
  const fullDateEndTime = `${fullDate}(${shortWeekDay}) ${hours12}`;

  return (
    <section className="flex h-full w-full flex-col gap-7 scroll-auto px-page pt-8 web:px-7">
      <DetailItem title="COMPANY" icon="briefcase" content={company} />
      <DetailItem title="POSITION" icon="position" content={position} />
      <DetailItem title="DATE" icon="clock" content={fullDateEndTime} />
      {platform && (
        <DetailItem title="PLATFORM" icon="web" content={platform} />
      )}
      {link !== ' ' && link && (
        <DetailItem.Link title="LINK" icon="globe" content={link} />
      )}
      {memo !== ' ' && memo && (
        <DetailItem.MarkDown title="MEMO" icon="memo" content={memo} />
      )}
    </section>
  );
};

export default Detail;
