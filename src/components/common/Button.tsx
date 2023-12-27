import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export type ButtonVariantTypes = VariantProps<typeof buttonVariants>['variant'];

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, width, variant, label, size, border, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          buttonVariants({ width, size, variant, border }),
          className,
        )}
        {...rest}
      >
        {label}
      </button>
    );
  },
);

const buttonVariants = cva('font-semibold hover:font-extrabold', {
  variants: {
    width: {
      full: 'w-full rounded-small py-2',
      max: 'w-max px-2',
    },
    size: {
      sm: 'text-0.85',
      md: 'text-1',
      lg: 'text-1.1',
    },
    variant: {
      primary: 'bg-primary500 text-white',
      gray: 'bg-black500 text-white',
      'primary-border': 'text-primary500',
      'gray-border': 'text-black600',
      'light-gray': 'bg-[#E8E8E8] text-black700',
    },
    border: {
      true: 'border-1 border-primary500',
      false: '',
    },
  },
  defaultVariants: {
    width: 'full',
    size: 'md',
    variant: 'primary',
    border: false,
  },
});

export default Button;
