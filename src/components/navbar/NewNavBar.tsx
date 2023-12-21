import NavBar from '@/components/common/NavBar';
import BackButton from './BackButton';
import SubmitButton from './SubmitButton';
import { MouseEvent } from 'react';
interface NewNavBarProps {
  active: boolean;
  onSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
}

const NewNavBar = ({ active, onSubmit }: NewNavBarProps) => {
  return (
    <div className="max-w-500 min-w-280 fixed top-0 z-20 w-full bg-white pt-[calc(env(safe-area-inset-top))]">
      <NavBar
        label="일정등록"
        leftSection={<BackButton />}
        rightSection={<SubmitButton active={active} onClick={onSubmit} />}
      />
    </div>
  );
};

export default NewNavBar;
