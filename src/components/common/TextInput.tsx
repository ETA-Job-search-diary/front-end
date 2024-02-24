import useFocus from '@/hook/useFocus';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export type FormIdType =
  | 'title'
  | 'step'
  | 'company'
  | 'position'
  | 'link'
  | 'platform'
  | 'date'
  | 'memo';

interface TextInputProps extends ComponentPropsWithoutRef<'input'> {
  id: FormIdType;
  isLoading?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, type = 'text', isLoading, placeholder, className, ...props }, ref) => {
    const isFilled = !!props.value;
    const { isFocus, onBlur, onFocus } = useFocus();

    return (
      <input
        ref={ref}
        id={id}
        className={cn(
          variants({ isFilled, outline: isFocus || isFilled }),
          className,
        )}
        placeholder={`${
          isLoading ? '정보를 가져오고 있어요...' : placeholder
        } `}
        onBlurCapture={onBlur}
        onFocus={onFocus}
        {...props}
      />
    );
  },
);

const variants = cva(
  'h-11 w-full rounded-small py-2 pl-[0.8rem] border-1 pr-10 font-medium web:h-12 text-0.95 text-black-900 placeholder:text-black-300',
  {
    variants: {
      isFilled: {
        true: 'bg-primary-light-50',
        false: '',
      },
      outline: {
        true: 'border-primary-300',
        false: 'border-black-100',
      },
    },
    defaultVariants: {
      isFilled: false,
    },
  },
);

export default TextInput;
