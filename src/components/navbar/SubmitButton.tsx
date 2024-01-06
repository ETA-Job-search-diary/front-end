import { ButtonHTMLAttributes, forwardRef } from 'react';
import Button from '../common/Button';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  active: boolean;
}

const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ label = '저장', active, ...rest }, ref) => {
    return (
      <Button
        ref={ref}
        size="lg"
        type="submit"
        label={label}
        variant={active ? 'primary-border' : 'gray-border'}
        disabled={!active}
        {...rest}
      />
    );
  },
);

export default SubmitButton;
