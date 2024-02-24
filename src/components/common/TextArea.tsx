import useFocus from '@/hook/useFocus';
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
    const { isFocus, onBlur, onFocus } = useFocus();

    const handleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.currentTarget;
      onChange?.(e);
      setCount(value.length);
    };

    return (
      <label
        htmlFor={id}
        className={`flex h-36 flex-col rounded-small border-1 web:h-64 ${!!count ? 'bg-primary-light-50' : ''} ${isFocus || !!count ? 'border-primary-300' : 'border-black-100'}`}
      >
        {label && <span className={`${formLabelStyle}`}>{label}</span>}
        <textarea
          id={id}
          className={`w-full grow bg-transparent p-[0.9rem] ${formTextStyle} placeholder:${formPlaceholderStyle}`}
          ref={ref}
          onChange={handleTextArea}
          onBlurCapture={onBlur}
          onFocus={onFocus}
          maxLength={maxLength}
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
