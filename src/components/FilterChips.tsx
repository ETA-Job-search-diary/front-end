import { STEPS } from '@/constants/form';
import Chip from './common/Chip';

const ETC = {
  value: 'etc',
  label: '기타',
};

interface FilterChipsProps {
  isEdit?: boolean;
  checked: string[];
  onClick: (value: string) => void;
}

const FilterChips = ({ isEdit, checked, onClick }: FilterChipsProps) => {
  return (
    <ul
      className={`grid grid-cols-4 gap-2 xs:gap-1 transition-all transform ${
        isEdit ? 'translate-y-[-2rem] opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
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
