import Icon, { IconTypes } from '@/assets/Icon';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface MoreMenuItemProps {
  label: keyof typeof labelTypes;
  onClick: () => void;
}

const labelTypes: Record<
  'edit' | 'delete',
  { label: string; icon: IconTypes }
> = {
  edit: {
    label: '수정',
    icon: 'edit',
  },
  delete: {
    label: '삭제',
    icon: 'delete',
  },
};

const MoreMenuItem = ({ label, onClick }: MoreMenuItemProps) => {
  return (
    <DropdownMenuItem
      id={`schedule_${label}`}
      onClick={onClick}
      className="flex items-center justify-center gap-2"
    >
      <Icon
        name={labelTypes[label].icon}
        className="h-4 w-4 fill-none stroke-black-600"
      />
      <span className="text-black-800">{labelTypes[label].label}하기</span>
    </DropdownMenuItem>
  );
};

export default MoreMenuItem;
