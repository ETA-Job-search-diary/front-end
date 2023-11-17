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
          className={`w-full h-36 web:h-60 bg-primary-bg border-[0.8px] border-primary300 rounded-small p-[0.9rem] ${formTextStyle} placeholder:${formPlaceholderStyle}`}
          ref={ref}
          maxLength={maxLength}
          onChange={handleTextArea}
          {...rest}
        />
        {maxLength && (
          <span className="absolute bottom-1 right-2 text-black200 text-xxs">{`${count} / 200 자`}</span>
        )}
      </label>
    );
  },
);

export default TextArea;
