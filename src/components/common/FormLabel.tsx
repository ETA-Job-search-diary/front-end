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
          {must && <sup className="text-primary-500"> *</sup>}
          {message ? (
            <span className="text-black-400 pl-2 text-0.85 font-normal xs:text-0.7">
              {message}
            </span>
          ) : errorMessage ? (
            <span className="text-primary-500 h-3 pl-2 text-0.85 font-normal xs:text-0.7">
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
