import { InputHTMLAttributes, forwardRef } from 'react';
import FormLabel from './FormLabel';
import useFocus from '@/hook/useFocus';
import ResetIcon from '@/assets/ResetIcon';
import { formPlaceholderStyle, formTextStyle } from './Form';
import { FormIdType } from './TextInput';

interface TextInputWithResetProps
  extends InputHTMLAttributes<HTMLInputElement> {
  id: FormIdType;
  must?: boolean;
  label?: string;
  onReset?: () => void;
}

const TextInputWithReset = forwardRef<
  HTMLInputElement,
  TextInputWithResetProps
>(({ id, must, label, type = 'text', onReset, ...rest }, ref) => {
  const { isFocus, onFocus, onBlur } = useFocus();

  return (
    <FormLabel id={id} label={label} must={must}>
      {onReset && (
        <span className="border-form relative h-10 w-full rounded-small border-primary300 web:h-12">
          <input
            id={id}
            className={`h-full w-full bg-primary-bg py-2 pl-[0.8rem] pr-10 font-medium ${formTextStyle} placeholder:${formPlaceholderStyle}`}
            ref={ref}
            onFocus={onFocus}
            onBlur={onBlur}
            {...rest}
          />
          {!!rest.value && (
            <button
              type="button"
              onClick={onReset}
              className="absolute right-3 h-10 web:h-12"
            >
              <ResetIcon />
            </button>
          )}
        </span>
      )}
    </FormLabel>
  );
});

export default TextInputWithReset;
