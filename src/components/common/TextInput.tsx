import { InputHTMLAttributes, forwardRef } from 'react';
import FormLabel from './FormLabel';
import { ERROR } from '@/constants/form';
import { FormIdType } from '@/model/form';
import useFocus from '@/hook/useFocus';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: FormIdType;
  label?: string;
  must?: boolean;
  isError?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, label, must, isError, ...rest }, ref) => {
    const { isFocus, onFocus, onBlur } = useFocus();

    return (
      <FormLabel id={id} label={label} must={must}>
        <span className="h-full">
          <input
            id={id}
            className={`w-full font-medium text-black900 text-xs web:text-md border-b ${
              isError ? 'border-primary500' : 'border-black100'
            } placeholder:text-black200 placeholder:text-xs web:placeholder:text-md placeholder:font-medium p-1 web:p-2`}
            ref={ref}
            onFocus={onFocus}
            onBlur={onBlur}
            {...rest}
          />
          {must &&
            (isError ? (
              <p className="text-primary500 text-xs leading-7">{ERROR[id]}</p>
            ) : (
              <p className="h-7"></p>
            ))}
        </span>
      </FormLabel>
    );
  },
);

export default TextInput;
0;
