import { STEPS } from '@/constants/form';
import Chip from '../common/Chip';

interface FilterChipsProps {
  isEdit?: boolean;
  checked: string[];
  onClick: (value: string) => void;
}

const FilterChips = ({ checked, onClick }: FilterChipsProps) => {
  return (
    <ul className="grid grid-cols-4 gap-2 xs:gap-1">
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

export default FilterChips;
