import NavBar from '../common/NavBar';
import BackButton from './BackButton';
import SubmitButton from './SubmitButton';
import { MouseEvent } from 'react';

interface EditNavBarProps {
  active: boolean;
  onSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
}

const EditNavBar = ({ active, onSubmit }: EditNavBarProps) => {
  return (
    <div className="fixed w-full min-w-[280px] max-w-[500px] top-0 bg-white z-20">
      <NavBar
        label="일정수정"
        leftSection={<BackButton />}
        rightSection={
          <SubmitButton label="수정" active={active} onClick={onSubmit} />
        }
      />
    </div>
  );
};

export default EditNavBar;
