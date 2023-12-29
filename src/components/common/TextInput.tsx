import { InputHTMLAttributes, forwardRef } from 'react';

import useFocus from '@/hook/useFocus';
import { formPlaceholderStyle, formTextStyle } from './Form';

export type FormIdType =
  | 'title'
  | 'step'
  | 'company'
  | 'position'
  | 'link'
  | 'platform'
  | 'date'
  | 'memo';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: FormIdType;
  must?: boolean;
  label?: string;
  isLoading?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { id, must, label, type = 'text', isLoading, placeholder, ...rest },
    ref,
  ) => {
    const { isFocus, onFocus, onBlur } = useFocus();

    return (
      <input
        id={id}
        className={`bg-primary-light-50 border-primary-300 h-10 w-full rounded-small border-form px-[0.8rem] py-2 font-medium web:h-12 ${formTextStyle} placeholder:${formPlaceholderStyle}`}
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
        {...rest}
        placeholder={`${
          isLoading ? '정보를 가져오고 있어요...' : placeholder
        } `}
      />
    );
  },
);

export default TextInput;
