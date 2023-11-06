import { InputHTMLAttributes, forwardRef } from 'react';
import FormLabel from './FormLabel';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  must?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, label, must, ...rest }, ref) => {
    return (
      <FormLabel id={id} label={label} must={must}>
        <input
          id={id}
          className="w-full text-black900 border-b border-black100 placeholder:text-black200 placeholder:text-xs web:placeholder:text-md placeholder:font-medium p-1 web:p-2"
          ref={ref}
          {...rest}
        />
      </FormLabel>
    );
  },
);

export default TextInput;
0;
