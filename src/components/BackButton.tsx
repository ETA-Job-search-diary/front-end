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
        className="stroke-black900 w-4 h-4 web:w-6 web:h-6 hover:scale-105 transition-all"
      />
    </button>
  );
};

export default BackButton;
