import { ReactNode } from 'react';
import { formLabelStyle } from './Form';

interface FormLabelProps {
  id: string;
  label?: string;
  must?: boolean;
  message?: string;
  errorMessage?: string;
  children?: ReactNode;
}

const FormLabel = ({
  id,
  label,
  must = true,
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
            <span className="text-black400 xs:text-[0.7rem] text-xxs font-normal pl-2">
              {message}
            </span>
          ) : errorMessage ? (
            <span className="text-primary500 xs:text-[0.7rem] text-xxs h-3 font-normal pl-2">
              {errorMessage}
            </span>
          ) : null}
        </span>
      )}
      {children}
    </label>
  );
};

export default FormLabel;
