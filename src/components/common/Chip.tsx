import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface ChipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  label: string;
  onClick: () => void;
}

const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ label, checked, onClick, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(chipVariants({ checked }), className)}
        onClick={onClick}
        {...rest}
      >
        <span>{label}</span>
      </div>
    );
  },
);

const chipVariants = cva(
  'rounded-full cursor-pointer border-[0.6px] web:border text-center xs:text-0.7 text-0.85 web:text-1 xs:h-6 xs:leading-6 h-8 leading-8 web:h-10 web:leading-10',
  {
    variants: {
      checked: {
        true: 'border-primary500 text-primary500',
        false: 'border-black100 text-black900',
      },
    },
    defaultVariants: {},
  },
);

export default Chip;
