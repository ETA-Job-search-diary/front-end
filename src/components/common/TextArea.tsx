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
  maxLength: number;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ id, label, maxLength, onChange, ...rest }, ref) => {
    const [count, setCount] = useState(0);

    const handleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.currentTarget;
      onChange(e);
      setCount(value.length);
    };

    return (
      <label htmlFor={id} className={`relative flex flex-col gap-3`}>
        {label && <span className={`${formLabelStyle}`}>{label}</span>}
        <textarea
          id={id}
          className={`border-form h-36 w-full rounded-small border-primary300 bg-primary-bg p-[0.9rem] web:h-64 ${formTextStyle} placeholder:${formPlaceholderStyle}`}
          ref={ref}
          maxLength={maxLength}
          onChange={handleTextArea}
          {...rest}
        />
        {maxLength && (
          <span className="absolute bottom-1 right-2 text-xxs text-black200">{`${count} / 200 자`}</span>
        )}
      </label>
    );
  },
);

export default TextArea;
