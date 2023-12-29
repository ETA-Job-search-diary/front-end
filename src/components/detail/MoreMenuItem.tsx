import Icon from '@/assets/Icon';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface MoreMenuItemProps {
  label: string;
  onClick: () => void;
}

const MoreMenuItem = ({ label, onClick }: MoreMenuItemProps) => {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className="flex items-center justify-center gap-2"
    >
      <Icon name={'delete'} className="stroke-black-600 h-4 w-4" />
      <span className="text-0.85 web:text-1.1">{label}하기</span>
    </DropdownMenuItem>
  );
};

export default MoreMenuItem;
