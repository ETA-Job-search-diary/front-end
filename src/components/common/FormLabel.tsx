import { ReactNode } from 'react';

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
  must = false,
  message,
  errorMessage,
  children,
}: FormLabelProps) => {
  return (
    <label htmlFor={id} className="h-full flex flex-col gap-1 web:gap-3">
      {label && (
        <span className="text-black-900 font-semibold w-max text-sm web:text-md">
          {label}
          {must && <span className="text-primary500"> *</span>}
          {must && message ? (
            <span className="text-black400 text-xxs web:text-xs font-normal">
              {' '}
              {message}
            </span>
          ) : errorMessage ? (
            <span className="text-primary500 text-xs h-3 font-normal">
              {' '}
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
