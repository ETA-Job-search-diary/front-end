import Icon, { IconTypes } from '@/assets/Icon';
import { FORM_LABEL } from '@/constants/form';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const MarkDownViewer = dynamic(() => import('../common/MarkdownViewer'));

interface DetailTitleProps {
  title: keyof typeof FORM_LABEL;
  icon: IconTypes;
}

interface DetailItemProps extends DetailTitleProps {
  content: string;
}

interface DetailItemLinkProps {
  title: keyof typeof FORM_LABEL;
  icon: IconTypes;
  content: string;
}

const DetailItem = ({ title, icon, content }: DetailItemProps) => {
  return (
    <div className={`${itemStyle}`}>
      <p className={`${titleStyle}`}>
        <Icon name={icon} className={`${iconStyle}`} />
        {FORM_LABEL[title]}
      </p>
      <p className={`${detailContentStyle}`}>{content}</p>
    </div>
  );
};

DetailItem.Link = ({ title, icon, content }: DetailItemLinkProps) => {
  return (
    <div className={`${itemStyle} items-start`}>
      <p className={`${titleStyle}`}>
        <Icon name={icon} className={`${iconStyle}`} />
        {FORM_LABEL[title]}
      </p>
      <Link
        href={content}
        rel="noopener noreferrer"
        target="_blank"
        className="pr-2"
      >
        <span
          className={`${detailContentStyle} text-wrap h-max w-full break-words border-b border-black-600`}
        >
          {content}
        </span>
      </Link>
    </div>
  );
};

DetailItem.MarkDown = ({ title, icon, content }: DetailItemProps) => {
  return (
    <div className="flex flex-col items-start gap-4">
      <p className={`${titleStyle}`}>
        <Icon name={icon} className={`${iconStyle}`} />
        {FORM_LABEL[title]}
      </p>
      <MarkDownViewer content={content} />
    </div>
  );
};

const itemStyle =
  'grid grid-cols-[5.5rem_minmax(8rem,_auto)] web:grid-cols-[auto_308px] gap-2';
const titleStyle =
  'text-black-800 font-semibold flex gap-3 items-center text-1 web:text-1.1 w-max';
const iconStyle = 'w-4 h-4 stroke-primary-icon';
export const detailContentStyle =
  'text-black-600 font-medium text-1 web:text-1.1';

export default DetailItem;
