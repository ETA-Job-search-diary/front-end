import ResetIcon from '@/assets/ResetIcon';
import useFocus from '@/hook/useFocus';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { ClipboardEvent, ComponentPropsWithoutRef, forwardRef } from 'react';
import { FormIdType } from './TextInput';

interface TextInputWithResetProps extends ComponentPropsWithoutRef<'input'> {
  id: FormIdType;
  onResetInput: () => void;
}

const TextInputWithReset = forwardRef<
  HTMLInputElement,
  TextInputWithResetProps
>(({ id, onChange, onPaste, onResetInput, className, ...props }, ref) => {
  const isFilled = !!props.value;
  const { isFocus, onBlur, onFocus } = useFocus();

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => onPaste?.(e);

  const handleReset = () => onResetInput();

  return (
    <>
      <input
        ref={ref}
        id={id}
        className={cn(
          variants({ isFilled, outline: isFocus || isFilled }),
          className,
        )}
        onChange={onChange}
        onPaste={handlePaste}
        onBlurCapture={onBlur}
        onFocus={onFocus}
        {...props}
      />
      {isFilled && (
        <button
          aria-label="reset-input"
          type="button"
          className="absolute bottom-1 right-3 -translate-y-1/2"
          onClick={handleReset}
        >
          <ResetIcon />
        </button>
      )}
    </>
  );
});

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

export default TextInputWithReset;
