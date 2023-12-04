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
      onClick={onClose ? onClose : () => back()}
      className="w-full h-full"
    >
      <Icon
        aria-label="=back-button"
        name="arrowleft"
        className="stroke-black900 w-6 mx-auto hover:scale-110 transition-all"
      />
    </button>
  );
};

export default BackButton;
