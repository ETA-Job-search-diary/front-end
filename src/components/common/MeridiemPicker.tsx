import { useState } from 'react';
import Icon from '@/assets/Icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export enum Meridiem {
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
    <div className="w-full border-b border-black100 font-medium text-black900 text-xs web:text-md">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex justify-between items-center w-full h-full p-1 web:p-2">
          <span>{mer}</span>
          <Icon
            name="chevronDown"
            className="stroke-black900 w-2 h-2 web:w-5 web:h-5"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleMeridiemChange(Meridiem.AM)}>
            {Meridiem.AM}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleMeridiemChange(Meridiem.PM)}>
            {Meridiem.PM}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MeridiemPicker;
