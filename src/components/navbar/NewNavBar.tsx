import NavBar from '@/components/common/NavBar';
import BackButton from './BackButton';

//TODO: 상단 클릭하면 위로 스크롤 되는 기능 추가
const NewNavBar = () => {
  return (
    <div className="sticky top-0 bg-white/60 backdrop-blur-xl web:bg-white/70 web:backdrop-blur-2xl">
      <NavBar label='일정추가' leftSection={<BackButton />} />
    </div>
  );
};

export default NewNavBar;
