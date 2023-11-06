import { InputHTMLAttributes, forwardRef } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, label, ...rest }, ref) => {
    return (
      <label htmlFor={id}>
        {label && <span className="font-semibold w-max">{label}</span>}
        <input
          id={id}
          className="w-full border border-gray-300"
          ref={ref}
          {...rest}
        />
      </label>
    );
  },
);

export default TextInput;
