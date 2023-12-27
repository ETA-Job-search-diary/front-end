import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  label: string;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ label, isPassed, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ isPassed }), className)}
        {...rest}
      >
        {label}
      </div>
    );
  },
);

const badgeVariants = cva(
  'm-auto h-max w-max whitespace-nowrap rounded-small p-1 text-0.85 font-medium',
  {
    variants: {
      isPassed: {
        true: 'bg-[#F1F1F1] text-black300',
        false: 'bg-primary50 text-primary500',
      },
    },
    defaultVariants: {
      isPassed: false,
    },
  },
);

export default Badge;
