import { STEP_STATISTICS } from '@/constants/form';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

export type StatisticsType =
  | 'documentAssignment'
  | 'personalityWritten'
  | 'interview'
  | 'etc';

export type StatisticsProps = Record<StatisticsType, number>;

interface StatisticsSectionProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statisticsVariants> {
  statistics: StatisticsProps;
}

const StepStatistics = forwardRef<HTMLDivElement, StatisticsSectionProps>(
  ({ statistics, variant, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(statisticsVariants({ variant }), className)}
        {...rest}
      >
        {STEP_STATISTICS.map(({ name, type }) => (
          <div key={name} className={cn(typeBoxVariants({ variant }))}>
            {variant === 'colorful' && (
              <p className={`${eventStyle[type]} h-1.5 w-1.5 rounded-full`} />
            )}
            <p className={cn(countVariants({ variant }))}>
              {statistics?.[type]}
            </p>
            <p className="text-0.9 text-black-600 ">{name}</p>
          </div>
        ))}
      </div>
    );
  },
);

const statisticsVariants = cva('grid bg-white', {
  variants: {
    variant: {
      default:
        'grid-cols-4 divide-x rounded-xl divide-black-100 border border-black-100 text-center py-5',
      colorful: 'grid-cols-2 rounded-2xl py-6',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const typeBoxVariants = cva('', {
  variants: {
    variant: {
      default: 'flex flex-col gap-1 web:gap-3',
      colorful:
        'grid grid-cols-[auto_1fr_auto] gap-2 items-center px-6 odd:border-r border-black-100 h-6',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const countVariants = cva('text-1 font-bold text-black-800', {
  variants: {
    variant: {
      default: 'h-5',
      colorful: 'order-1 min-w-4 text-center',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const eventStyle = {
  documentAssignment: 'bg-orange-100',
  personalityWritten: 'bg-blue-200',
  interview: 'bg-mint-100',
  etc: 'bg-purple-100',
};

export default StepStatistics;
