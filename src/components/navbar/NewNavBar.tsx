import NavBar from '../common/NavBar';
import BackButton from './BackButton';
import SubmitButton from './SubmitButton';

interface NewNavBarProps {
  hasOrigin: boolean;
  isSubmitValid: boolean;
}

const NewNavBar = ({ hasOrigin, isSubmitValid }: NewNavBarProps) => {
  return (
    <div className="sticky top-0 z-20 h-full w-full bg-white pt-safe-top">
      <NavBar
        label={hasOrigin ? '일정수정' : '일정등록'}
        leftSection={<BackButton />}
        rightSection={
          <SubmitButton label={hasOrigin ? '수정' : '저장'} active={isSubmitValid} />
        }
      />
    </div>
  );
};

export default NewNavBar;
