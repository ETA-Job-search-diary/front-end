import { useState } from 'react';
import Icon from '@/assets/Icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formTextStyle } from './Form';

export const meridiemItem = {
  AM: '오전',
  PM: '오후',
};

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
    <div
      className={`h-10 w-full rounded-small border-[0.8px] border-primary300 bg-primary-bg web:h-12 ${formTextStyle}`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-full w-full items-center justify-between px-[0.8rem] py-2">
          <span>{mer}</span>
          <Icon
            name="chevronDown"
            className="h-2 w-2 stroke-black900 web:h-5 web:w-5"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            key={meridiemItem.AM}
            onClick={() => handleMeridiemChange(meridiemItem.AM)}
          >
            {meridiemItem.AM}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            key={meridiemItem.PM}
            onClick={() => handleMeridiemChange(meridiemItem.PM)}
          >
            {meridiemItem.PM}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MeridiemPicker;
