import { useState } from 'react';
import Icon from '@/assets/Icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export enum MeridiemType {
  AM = '오전',
  PM = '오후',
}

interface MeridiemPickerProps {
  meridiem: string;
  onChange?: (value: string) => void;
}

const MeridiemPicker = ({ meridiem, onChange }: MeridiemPickerProps) => {
  const [mer, setMer] = useState(meridiem);

  const handleMeridiemChange = (value: string) => {
    setMer(value);
    onChange?.(value);
  };

  return (
    <div className="w-full h-10 web:h-12 bg-primary-bg border-[0.8px] border-primary300 rounded-small font-medium text-black900 text-xs web:text-sm">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex justify-between items-center w-full h-full py-2 px-[0.8rem]">
          <span>{mer}</span>
          <Icon
            name="chevronDown"
            className="stroke-black900 w-2 h-2 web:w-5 web:h-5"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            key={MeridiemType.AM}
            onClick={() => handleMeridiemChange(MeridiemType.AM)}
          >
            {MeridiemType.AM}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            key={MeridiemType.PM}
            onClick={() => handleMeridiemChange(MeridiemType.PM)}
          >
            {MeridiemType.PM}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MeridiemPicker;
