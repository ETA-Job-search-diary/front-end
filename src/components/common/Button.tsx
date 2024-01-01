import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonVariantTypes = VariantProps<typeof buttonVariants>['variant'];

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, width, variant, label, size, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ width, size, variant }), className)}
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
      primary: 'bg-primary-500 text-white',
      gray: 'bg-black-500 text-white',
      'primary-border': 'text-primary-500',
      'gray-border': 'text-black-600',
      'light-gray': 'bg-gray-300 text-black-700',
    },
  },
  defaultVariants: {
    width: 'full',
    size: 'md',
    variant: 'primary',
  },
});

export default Button;
