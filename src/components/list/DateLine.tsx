import { cn } from '@/lib/utils';
import { convertDateToAlternateFormat } from '@/service/date';
import { cva, type VariantProps } from 'class-variance-authority';

interface DateLineProps extends VariantProps<typeof datelineVariants> {
  date: string;
}

const DateLine = ({ tab, date }: DateLineProps) => {
  const month = convertDateToAlternateFormat(date);
  return <p className={cn(datelineVariants({ tab }))}>{month}</p>;
};

const datelineVariants = cva(
  'w-full px-2.5 py-1.5 text-0.85 font-semibold rounded-sm',
  {
    variants: {
      tab: {
        coming: 'text-primary-500 bg-primary-light-100',
        past: 'bg-body text-black-300',
      },
    },
    defaultVariants: {
      tab: 'coming',
    },
  },
);

export default DateLine;
