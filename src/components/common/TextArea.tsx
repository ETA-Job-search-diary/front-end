import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ id, label, ...rest }, ref) => {
    return (
      <label htmlFor={id} className="grid grid-cols-[auto_1fr] gap-3">
        <span className="font-semibold">{label}</span>
        <textarea
          id={id}
          className="w-full border border-gray-300"
          ref={ref}
          {...rest}
        />
      </label>
    );
  },
);

export default TextArea;
