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
    <div className="fixed w-full min-w-[280px] max-w-[500px] top-0 bg-white z-20 pt-[calc(env(safe-area-inset-top))]">
      <NavBar
        label="일정등록"
        leftSection={<BackButton />}
        rightSection={<SubmitButton active={active} onClick={onSubmit} />}
      />
    </div>
  );
};

export default NewNavBar;
