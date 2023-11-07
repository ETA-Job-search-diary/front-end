import { ReactNode } from 'react';

interface FormLabelProps {
  id: string;
  label?: string;
  must?: boolean;
  children?: ReactNode;
}

const FormLabel = ({ id, label, must = false, children }: FormLabelProps) => {
  return (
    <label htmlFor={id} className="flex flex-col gap-1 web:gap-3">
      {label && (
        <span className="font-semibold w-max text-xs web:text-md">
          {label}
          {must && <span className="text-primary500"> *</span>}
        </span>
      )}
      {children}
    </label>
  );
};

export default FormLabel;
