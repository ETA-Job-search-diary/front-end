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
            <span className="pl-2 text-xxs font-normal text-black400 xs:text-[0.7rem]">
              {message}
            </span>
          ) : errorMessage ? (
            <span className="h-3 pl-2 text-xxs font-normal text-primary500 xs:text-[0.7rem]">
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
