'use client';

import Icon from '@/assets/Icon';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  onClose?: () => void;
}

const BackButton = ({ onClose }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      onClick={onClose ? onClose : () => router.back()}
      className="w-full h-full"
    >
      <Icon
        name="arrowleft"
        className="stroke-black900 w-5 web:w-[1.5rem] mx-auto hover:scale-110 transition-all"
      />
    </button>
  );
};

export default BackButton;
