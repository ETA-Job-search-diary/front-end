import NavBar from '@/components/common/NavBar';
import BackButton from './BackButton';
import SubmitButton from './SubmitButton';
import { MouseEvent, memo } from 'react';
interface NewNavBarProps {
  active: boolean;
  onSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
}

const NewNavBar = ({ active, onSubmit }: NewNavBarProps) => {
  return (
    <div className="fixed top-0 z-20 w-full min-w-[280px] max-w-[500px] bg-white">
      <NavBar
        label="일정등록"
        leftSection={<BackButton />}
        rightSection={<SubmitButton active={active} onClick={onSubmit} />}
      />
    </div>
  );
};

export default memo(NewNavBar);
