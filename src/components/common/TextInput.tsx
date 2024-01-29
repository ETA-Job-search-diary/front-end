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
  isLoading?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, type = 'text', isLoading, placeholder, ...props }, ref) => {
    return (
      <input
        id={id}
        className={`h-11 w-full rounded-small border-1 border-primary-300 bg-primary-light-50 px-[0.8rem] py-2 font-medium web:h-12 ${formTextStyle} placeholder:${formPlaceholderStyle}`}
        ref={ref}
        placeholder={`${
          isLoading ? '정보를 가져오고 있어요...' : placeholder
        } `}
        {...props}
      />
    );
  },
);

export default TextInput;
