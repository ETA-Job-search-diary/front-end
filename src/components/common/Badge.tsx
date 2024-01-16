import Icon from '@/assets/Icon';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  label: string;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ label, variant, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...rest}
      >
        {!variant && <Icon name="clock" className="w-3" />}
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
        fail: 'bg-gray-200 text-black-300',
      },
    },
    defaultVariants: {
      variant: 'pending',
    },
  },
);

export default Badge;
