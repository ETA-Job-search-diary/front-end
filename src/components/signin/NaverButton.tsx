'use client';

import Icon from '@/assets/Icon';
import { useToast } from '../ui/use-toast';

const NaverButton = () => {
  const { toast } = useToast();

  const handleNaverToast = () => {
    toast({
      title: '네이버 로그인은 승인 대기중입니다..',
      description: '빠른 시일내에 준비할게요!',
    });
  };

  return (
    <button
      className="z-10 w-full bg-white rounded-medium border py-3 px-4 web:py-4 web:px-6 flex justify-center items-center"
      onClick={handleNaverToast}
    >
      <Icon name="naver" className="w-4 h-4 web:w-6 web:h-6" />
      <span className="grow text-black800 text-xs web:text-md font-medium">
        네이버 계정으로 로그인
      </span>
    </button>
  );
};

export default NaverButton;
