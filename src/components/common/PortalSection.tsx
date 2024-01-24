import useDisableBodyScroll from '@/hook/useDisableBodyScroll';
import { cn } from '@/lib/utils';
import { HTMLAttributes, MouseEvent, ReactNode, forwardRef } from 'react';
import { createPortal } from 'react-dom';

interface PortalSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClose?: () => void;
}

const PortalSection = forwardRef<HTMLDivElement, PortalSectionProps>(
  ({ children, className, onClose, ...props }, ref) => {
    if (typeof window === 'undefined') return null;

    const handleBackGroundClick = (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose?.();
      }
    };

    useDisableBodyScroll();

    return createPortal(
      <div
        className={`fixed top-0 z-30 mx-auto flex min-h-screen w-full min-w-280 max-w-500 items-center justify-center bg-alert`}
        onClick={handleBackGroundClick}
      >
        <section
          ref={ref}
          className={cn(
            'flex min-w-[60%] flex-col items-center justify-center rounded-medium px-4 py-4 shadow-md',
            className,
          )}
          {...props}
        >
          {children}
        </section>
      </div>,
      document.body.querySelector('main')!,
    );
  },
);

export default PortalSection;
