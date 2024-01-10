import { cn } from '@/lib/utils';
import { ReactNode, memo } from 'react';
import { formLabelStyle } from './Form';

interface FormLabelProps {
  id?: string;
  label?: string;
  must?: boolean;
  message?: string;
  errorMessage?: string;
  className?: string;
  children?: ReactNode;
}

const FormLabel = ({
  id,
  label,
  must = false,
  message,
  errorMessage,
  className,
  children,
}: FormLabelProps) => {
  return (
    <label htmlFor={id} className={cn('flex flex-col gap-3', className)}>
      {label && (
        <span className={`${formLabelStyle}`}>
          {label}
          {must && <sup className="text-primary-500"> *</sup>}
          {errorMessage ? (
            <span className="h-3 pl-2 text-0.8 font-normal text-primary-500 xs:text-0.7">
              {errorMessage}
            </span>
          ) : message ? (
            <span className="pl-2 text-0.8 font-normal text-black-500 xs:text-0.7">
              {message}
            </span>
          ) : null}
        </span>
      )}
      {children}
    </label>
  );
};

export default memo(FormLabel);
