import Icon from '@/assets/Icon';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  label: string;
  hasIcon?: boolean;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ label, hasIcon = false, variant, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      >
        {hasIcon && (
          <Icon name="clock" className={cn(badgeIconVariants({ variant }))} />
        )}
        {variant ? getBadgeLabel({ label, variant }) : label}
      </div>
    );
  },
);

const getBadgeLabel = ({
  label,
  variant,
}: {
  label: string;
  variant: VariantProps<typeof badgeVariants>['variant'];
}) => {
  if (!variant) return label;

  const badge = {
    pass: '합격',
    fail: label === variant ? '불합격' : label,
    pending: label,
  };
  return badge[variant];
};

const badgeVariants = cva(
  'h-max w-max whitespace-nowrap m-auto px-1 py-0.5 text-[0.85rem] rounded-md font-semibold',
  {
    variants: {
      variant: {
        pending:
          'bg-primary-50 text-primary-500 flex items-center justify-center gap-1',
        pass: 'bg-blue-50 text-blue-300',
        fail: 'bg-gray-200 text-black-300 flex items-center justify-center gap-1',
      },
    },
    defaultVariants: {
      variant: 'pending',
    },
  },
);

const badgeIconVariants = cva('w-3', {
  variants: {
    variant: {
      pending: 'stroke-primary-icon',
      pass: '',
      fail: 'stroke-black-300',
    },
  },
});

export default Badge;
