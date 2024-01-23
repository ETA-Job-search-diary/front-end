import { cn } from '@/lib/utils';
import { HTMLAttributes, ReactNode, forwardRef, memo } from 'react';

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

const NavBar = forwardRef<HTMLDivElement, NavBarProps>(
  ({ label, leftSection, rightSection, className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          'grid h-16 w-full grid-cols-[1fr_5fr_1fr] place-items-stretch items-center justify-center px-1 text-1.1 text-black-900 web:h-[70px]',
          className,
        )}
        {...props}
      >
        <p className="col-start-1">{leftSection}</p>
        <p className="col-start-2 text-center font-semibold">{label}</p>
        <p className="col-start-3 text-center">{rightSection}</p>
      </nav>
    );
  },
);

export default memo(NavBar);
