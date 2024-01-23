'use client';

import Icon from '@/assets/Icon';
import { useRouter } from 'next/navigation';
import { HTMLAttributes, forwardRef } from 'react';

interface BackButtonProps extends HTMLAttributes<HTMLButtonElement> {
  onClose?: () => void;
}

const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>(
  ({ onClose, ...props }, ref) => {
    const { back } = useRouter();

    return (
      <button
        ref={ref}
        aria-label="back button"
        onClick={onClose ? onClose : () => back()}
        className="h-full w-full"
        {...props}
      >
        <Icon
          name="arrowleft"
          className="mx-auto w-6 stroke-black-900 transition-all hover:scale-110"
        />
      </button>
    );
  },
);

export default BackButton;
