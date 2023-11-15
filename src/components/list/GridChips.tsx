import { STEPS } from '@/constants/form';
import Chip from '../common/Chip';

interface GridChipsProps {
  checked: string[];
  onClick: (value: string) => void;
}

const GridChips = ({ checked, onClick }: GridChipsProps) => {
  return (
    <ul className="grid grid-cols-4 gap-[0.7rem]">
      {STEPS.map(({ value, name }) => (
        <li key={value}>
          <Chip
            label={name}
            checked={checked.includes(value)}
            onClick={() => onClick(value)}
          />
        </li>
      ))}
    </ul>
  );
};

export default GridChips;
