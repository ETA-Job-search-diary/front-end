import { InputHTMLAttributes, forwardRef } from 'react';
import FormLabel from './FormLabel';
import { FormIdType } from '@/model/form';
import useFocus from '@/hook/useFocus';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: FormIdType;
  must?: boolean;
  label?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, must, label, type = 'text', ...rest }, ref) => {
    const { isFocus, onFocus, onBlur } = useFocus();

    return (
      <FormLabel id={id} label={label} must={must}>
        <input
          id={id}
          className={`w-full h-10 web:h-12 font-medium text-black900 bg-primary-bg border-[0.8px] border-primary300 rounded-small text-xs web:text-sm placeholder:text-black300 placeholder:text-xs web:placeholder:text-sm placeholder:font-medium py-2 px-[0.8rem]`}
          ref={ref}
          onFocus={onFocus}
          onBlur={onBlur}
          {...rest}
        />
      </FormLabel>
    );
  },
);

export default TextInput;
