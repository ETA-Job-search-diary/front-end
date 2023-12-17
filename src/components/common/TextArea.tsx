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
      <label
        htmlFor={id}
        className={`flex h-36 flex-col rounded-small border-form border-primary300 bg-primary-bg web:h-64`}
      >
        {label && <span className={`${formLabelStyle}`}>{label}</span>}
        <textarea
          id={id}
          className={`w-full grow bg-transparent p-[0.9rem] ${formTextStyle} placeholder:${formPlaceholderStyle}`}
          ref={ref}
          maxLength={maxLength}
          onChange={handleTextArea}
          {...rest}
        />
        {maxLength && (
          <span className="pb-0.5 pr-[0.9rem] text-end text-xxs text-black200">{`${count} / 200 자`}</span>
        )}
      </label>
    );
  },
);

export default TextArea;
