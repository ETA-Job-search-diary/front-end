import Icon, { IconTypes } from '@/assets/Icon';
import Link from 'next/link';
import MarkDownViewer from '../common/MarkdownViewer';
import { FormTypes } from '@/constants/form';

interface DetailTitleProps {
  title: keyof typeof FormTypes;
  icon: IconTypes;
}

interface DetailItemProps extends DetailTitleProps {
  content: string;
}

interface DetailItemLinkProps {
  title: keyof typeof FormTypes;
  icon: IconTypes;
  content: string;
}

const DetailItem = ({ title, icon, content }: DetailItemProps) => {
  return (
    <div className={`${itemStyle}`}>
      <h3 className={`${titleStyle}`}>
        <Icon name={icon} className={`${iconStyle}`} />
        {FormTypes[title]}
      </h3>
      <p className={`${detailContentStyle}`}>{content}</p>
    </div>
  );
};

DetailItem.Link = ({ title, icon, content }: DetailItemLinkProps) => {
  return (
    <div className={`${itemStyle}`}>
      <h3 className={`${titleStyle}`}>
        <Icon name={icon} className={`${iconStyle}`} />
        {FormTypes[title]}
      </h3>
      <Link
        href={content}
        rel="noopener noreferrer"
        target="_blank"
        className={`${detailContentStyle} col-start-2 min-w-full break-words pr-2`}
      >
        <span className="border-black-600 border-b">{content}</span>
      </Link>
    </div>
  );
};

DetailItem.MarkDown = ({ title, icon, content }: DetailItemProps) => {
  return (
    <div className="flex flex-col items-start gap-4">
      <h3 className={`${titleStyle}`}>
        <Icon name={icon} className={`${iconStyle}`} />
        {FormTypes[title]}
      </h3>
      <MarkDownViewer content={content} />
    </div>
  );
};

const itemStyle = 'grid grid-cols-[90px_auto] web:grid-cols-[auto_308px] gap-5';
const titleStyle =
  'text-black-800 font-semibold flex gap-3 items-center whitespace-nowrap leading5 text-1 web:text-1.1';
const iconStyle = 'w-4 h-4';
export const detailContentStyle =
  'text-black-600 font-medium text-1 web:text-1.1';

export default DetailItem;
