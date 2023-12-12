import { InputHTMLAttributes, forwardRef } from 'react';
import FormLabel from './FormLabel';

import useFocus from '@/hook/useFocus';
import { formPlaceholderStyle, formTextStyle } from './Form';
import { FormIdType } from '@/constants/form';

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
          className={`h-10 w-full rounded-small border-[0.8px] border-primary300 bg-primary-bg px-[0.8rem] py-2 font-medium web:h-12 ${formTextStyle} placeholder:${formPlaceholderStyle}`}
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
