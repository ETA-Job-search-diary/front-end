import {
  ChangeEvent,
  TextareaHTMLAttributes,
  forwardRef,
  useState,
} from 'react';
import { formLabelStyle, formPlaceholderStyle, formTextStyle } from './Form';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ id, label, maxLength, onChange, ...props }, ref) => {
    const [count, setCount] = useState(0);

    const handleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.currentTarget;
      onChange && onChange(e);
      setCount(value.length);
    };

    return (
      <label
        htmlFor={id}
        className={`flex h-36 flex-col rounded-small border-1 border-primary-300 bg-primary-light-50 web:h-64`}
      >
        {label && <span className={`${formLabelStyle}`}>{label}</span>}
        <textarea
          id={id}
          className={`w-full grow bg-transparent p-[0.9rem] ${formTextStyle} placeholder:${formPlaceholderStyle}`}
          ref={ref}
          onChange={handleTextArea}
          {...props}
        />
        {maxLength && (
          <span className="pb-2.5 pr-[0.9rem] text-end text-0.85 text-black-200">{`${count} / ${maxLength} 자`}</span>
        )}
      </label>
    );
  },
);

export default TextArea;
