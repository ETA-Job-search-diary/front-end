'use client';

import Icon from '@/assets/Icon';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  onClose?: () => void;
}

const BackButton = ({ onClose }: BackButtonProps) => {
  const { back } = useRouter();

  return (
    <button
      aria-label="back button"
      onClick={onClose ? onClose : () => back()}
      className="h-full w-full"
    >
      <Icon
        name="arrowleft"
        className="mx-auto w-6 stroke-black-900 transition-all hover:scale-110"
      />
    </button>
  );
};

export default BackButton;
