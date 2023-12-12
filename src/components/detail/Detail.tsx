import { getFormattedDateTimeInfo } from '@/service/date';
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
  const { endTime } = getFormattedDateTimeInfo(date);

  return (
    <section className="flex h-full w-full flex-col gap-7 scroll-auto px-[22px] pt-8 web:px-[28px]">
      <DetailItem title="COMPANY" icon="briefcase" content={company} />
      <DetailItem title="POSITION" icon="position" content={position} />
      <DetailItem title="DATE" icon="clock" content={endTime} />
      {link !== ' ' && (link || platform) && (
        <DetailItem.Link
          title="LINK"
          icon="globe"
          content={platform}
          link={link}
        />
      )}
      {memo !== ' ' && memo && (
        <DetailItem.MarkDown title="MEMO" icon="memo" content={memo} />
      )}
    </section>
  );
};

export default Detail;
