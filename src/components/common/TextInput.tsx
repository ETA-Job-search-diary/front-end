import { InputHTMLAttributes, forwardRef } from 'react';
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
    return (
      <input
        id={id}
        className={`h-11 w-full rounded-small border-form border-primary-300 bg-primary-light-50 px-[0.8rem] py-2 font-medium web:h-12 ${formTextStyle} placeholder:${formPlaceholderStyle}`}
        ref={ref}
        placeholder={`${
          isLoading ? '정보를 가져오고 있어요...' : placeholder
        } `}
        {...rest}
      />
    );
  },
);

export default TextInput;
