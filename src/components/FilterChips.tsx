import { STEPS } from '@/constants/form';
import Chip from './common/Chip';

const ETC = {
  value: 'etc',
  label: '기타',
};

interface FilterChipsProps {
  checked: string[];
  onClick: (value: string) => void;
}

const FilterChips = ({ checked, onClick }: FilterChipsProps) => {
  return (
    <ul className="grid grid-cols-4 gap-2 xs:gap-1">
      {[...STEPS, ETC].map(({ value, label }) => (
        <li key={value}>
          <Chip
            label={label}
            checked={checked.includes(value)}
            onClick={() => onClick(value)}
          />
        </li>
      ))}
    </ul>
  );
};

export default FilterChips;
