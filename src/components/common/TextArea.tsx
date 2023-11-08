import {
  ChangeEvent,
  TextareaHTMLAttributes,
  forwardRef,
  useState,
} from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
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
        className="text-black900 relative flex flex-col gap-3 text-sm web:text-md"
      >
        <span className="font-semibold">{label}</span>
        <textarea
          id={id}
          className="w-full font-medium border-b border-black100 placeholder:text-xs web:placeholder:text-md placeholder:text-black200 placeholder:font-medium p-1 web:p-2 h-32 web:h-44"
          ref={ref}
          maxLength={maxLength}
          onChange={handleTextArea}
          {...rest}
        />
        {maxLength && (
          <span className="absolute bottom-1 right-2 text-black200 text-xxs web:text-xs">{`${count} / 200 자`}</span>
        )}
      </label>
    );
  },
);

export default TextArea;
