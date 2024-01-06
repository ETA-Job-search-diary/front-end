import { STEPS } from '@/constants/form';
import { StepTypes } from '@/model/schedule';
import Chip from '../common/Chip';

interface GridChipsProps {
  checked: StepTypes[];
  onClick: (value: StepTypes) => void;
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

export default GridChips;
