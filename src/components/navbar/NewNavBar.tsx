import NavBar from '@/components/common/NavBar';
import BackButton from './BackButton';

//TODO: 상단 클릭하면 위로 스크롤 되는 기능 추가
const NewNavBar = () => {
  return (
    <div className="sticky top-0 bg-white">
      <NavBar label='일정등록' leftSection={<BackButton />} />
    </div>
  );
};

export default NewNavBar;
