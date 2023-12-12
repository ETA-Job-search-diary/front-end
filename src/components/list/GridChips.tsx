import { STEPS } from '@/constants/form';
import Chip from '../common/Chip';
import { memo } from 'react';

interface GridChipsProps {
  checked: string[];
  onClick: (value: string) => void;
}

const GridChips = ({ checked, onClick }: GridChipsProps) => {
  return (
    <ul className="grid grid-cols-4 gap-[0.7rem]">
      {STEPS.map(({ type, name }) => {
        return (
          <li key={type}>
            <Chip
              label={name}
              checked={checked.includes(type)}
              onClick={() => onClick(type)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default memo(GridChips);
