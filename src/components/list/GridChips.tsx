import { STEPS } from '@/constants/form';
import { StepTypes } from '@/model/schedule';
import Chip from '../common/Chip';

interface GridChipsProps {
  variant: 'outline' | 'filled';
  checked: StepTypes[];
  onClick: (value: StepTypes) => void;
}

const GridChips = ({ variant, checked, onClick }: GridChipsProps) => {
  return (
    <ul className="grid grid-cols-4 gap-2.5">
      {STEPS.map(({ type, name }) => {
        const chipVariant = checked.includes(type) ? variant : 'default';
        return (
          <li key={type}>
            <Chip
              id={`filter_step_${type}`}
              label={name}
              variant={chipVariant}
              onClick={() => onClick(type)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default GridChips;
