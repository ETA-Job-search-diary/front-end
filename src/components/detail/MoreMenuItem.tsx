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
      className="flex justify-center items-center gap-2"
    >
      <Icon name={'delete'} className="w-4 h-4 stroke-black600" />
      <span className="text-xxs web:text-sm">{label}하기</span>
    </DropdownMenuItem>
  );
};

export default MoreMenuItem;
