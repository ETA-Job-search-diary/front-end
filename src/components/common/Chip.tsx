import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

interface ChipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  label: string;
  onClick: () => void;
}

const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ label, variant, onClick, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(chipVariants({ variant }))}
        onClick={onClick}
        {...props}
      >
        <span>{label}</span>
      </div>
    );
  },
);

const chipVariants = cva(
  'rounded-full cursor-pointer text-center xs:text-0.7 text-[0.85rem] web:text-[1rem] xs:h-6 xs:leading-6 h-8 leading-8 web:h-10 web:leading-10',
  {
    variants: {
      variant: {
        default: 'border-black-100 text-black-900 border-1 web:border',
        outline: 'border-1 border-primary-500 text-primary-500',
        filled: 'bg-primary-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export default Chip;
