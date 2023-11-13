import Icon, { IconTypes } from '@/assets/Icon';
import Link from 'next/link';
import MarkDownViewer from '../common/MarkdownViewer';

interface DetailTitleProps {
  title: string;
  icon: IconTypes;
}

interface DetailItemProps extends DetailTitleProps {
  content: string;
}

interface DetailItemLinkProps {
  title: string;
  icon: IconTypes;
  content?: string;
  link?: string;
}

const DetailItem = ({ title, icon, content }: DetailItemProps) => {
  return (
    <div className={`${itemStyle}`}>
      <h3 className={`${titleStyle}`}>
        <Icon name={icon} className={`${iconStyle}`} />
        {title}
      </h3>
      <p className={`${contentStyle}`}>{content}</p>
    </div>
  );
};

DetailItem.Link = ({ title, icon, content, link }: DetailItemLinkProps) => {
  return (
    <div className={`${itemStyle}`}>
      <h3 className={`${titleStyle}`}>
        <Icon name={icon} className={`${iconStyle}`} />
        {title}
      </h3>
      {content && <p className={`${contentStyle} col-start-2`}>{content}</p>}
      {link && (
        <Link
          href={link}
          rel="noopener noreferrer"
          target="_blank"
          className={`${contentStyle} break-words min-w-full pr-2 col-start-2`}
        >
          <span className="border-b border-black-600">{link}</span>
        </Link>
      )}
    </div>
  );
};

DetailItem.MarkDown = ({ title, icon, content }: DetailItemProps) => {
  return (
    <div className={`${itemStyle}`}>
      <h3 className={`${titleStyle}`}>
        <Icon name={icon} className={`${iconStyle}`} />
        {title}
      </h3>
      <MarkDownViewer content={content} />
    </div>
  );
};

const itemStyle = 'grid grid-cols-[80px_auto] web:grid-cols-[auto_308px] gap-4';
const titleStyle =
  'text-black-900 font-semibold flex gap-3 items-center whitespace-nowrap leading5';
const iconStyle = 'w-3 h-3 web:w-4 web:h-4';
const contentStyle = 'text-black600 font-medium';

export default DetailItem;
