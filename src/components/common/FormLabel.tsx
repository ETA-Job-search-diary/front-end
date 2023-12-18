import { ReactNode, memo } from 'react';
import { formLabelStyle } from './Form';

interface FormLabelProps {
  id?: string;
  label?: string;
  must?: boolean;
  message?: string;
  errorMessage?: string;
  children?: ReactNode;
}

const FormLabel = ({
  id,
  label,
  must = false,
  message,
  errorMessage,
  children,
}: FormLabelProps) => {
  return (
    <label htmlFor={id} className="flex flex-col gap-3">
      {label && (
        <span className={`${formLabelStyle}`}>
          {label}
          {must && <sup className="text-primary500"> *</sup>}
          {message ? (
            <span className="xs:text-0.7 text-0.85 pl-2 font-normal text-black400">
              {message}
            </span>
          ) : errorMessage ? (
            <span className="xs:text-0.7 text-0.85 h-3 pl-2 font-normal text-primary500">
              {errorMessage}
            </span>
          ) : null}
        </span>
      )}
      {children}
    </label>
  );
};

export default memo(FormLabel);
