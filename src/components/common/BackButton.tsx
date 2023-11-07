'use client';

import Icon from '@/assets/Icon';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="w-full h-12 web:h-[70px]">
      <Icon
        name="arrowleft"
        className="stroke-black800 w-4 h-4 web:w-6 web:h-6"
      />
    </button>
  );
};

export default BackButton;
