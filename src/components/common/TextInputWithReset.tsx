import ResetIcon from '@/assets/ResetIcon';
import { cn } from '@/lib/utils';
import {
  ChangeEvent,
  ClipboardEvent,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from 'react';
import { formPlaceholderStyle, formTextStyle } from './Form';
import { FormIdType } from './TextInput';

interface TextInputWithResetProps
  extends InputHTMLAttributes<HTMLInputElement> {
  id: FormIdType;
  onResetInput: () => void;
}

const TextInputWithReset = forwardRef<
  HTMLInputElement,
  TextInputWithResetProps
>(({ id, onChange, onPaste, onResetInput, className, ...props }, ref) => {
  const [isFilled, setIsFilled] = useState(false);

  const handleFilled = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    onChange?.(e);
    setIsFilled(value.length > 0);
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    onPaste?.(e);
    setIsFilled(e.clipboardData.getData('text').length > 0);
  };

  const handleReset = () => {
    onResetInput();
    setIsFilled(false);
  };

  return (
    <>
      <input
        ref={ref}
        id={id}
        className={cn(
          `h-11 w-full rounded-small border-1 border-primary-300 bg-primary-light-50 py-2 pl-[0.8rem] pr-10 font-medium web:h-12 ${formTextStyle} placeholder:${formPlaceholderStyle}`,
          className,
        )}
        onChange={handleFilled}
        onPaste={handlePaste}
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

export default TextInputWithReset;
