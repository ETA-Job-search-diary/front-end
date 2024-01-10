import ResetIcon from '@/assets/ResetIcon';
import { cn } from '@/lib/utils';
import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from 'react';
import { formPlaceholderStyle, formTextStyle } from './Form';

interface TextInputWithResetProps
  extends InputHTMLAttributes<HTMLInputElement> {
  onResetInput: () => void;
}

const TextInputWithReset = forwardRef<
  HTMLInputElement,
  TextInputWithResetProps
>(({ id, onChange, onResetInput, className, ...rest }, ref) => {
  const [isFilled, setIsFilled] = useState(false);

  const handleFilled = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    onChange && onChange(e);
    setIsFilled(value.length > 0);
  };

  return (
    <>
      <input
        ref={ref}
        id={id}
        className={cn(
          `h-10 w-full rounded-small border-[0.8px] border-primary-300 bg-primary-light-50 py-2 pl-[0.8rem] pr-10 font-medium web:h-12 ${formTextStyle} placeholder:${formPlaceholderStyle}`,
          className,
        )}
        onChange={handleFilled}
        {...rest}
      />
      {isFilled && (
        <button
          aria-label="reset-input"
          type="button"
          className="absolute bottom-1 right-3 -translate-y-1/2"
          onClick={onResetInput}
        >
          <ResetIcon />
        </button>
      )}
    </>
  );
});

export default TextInputWithReset;
