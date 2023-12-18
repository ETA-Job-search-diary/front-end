import { ButtonHTMLAttributes } from 'react';

export type ColorTypes =
  | 'primary'
  | 'gray'
  | 'primary-border'
  | 'gray-border'
  | 'light-gray';
type SizeTypes = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  width?: 'full' | 'max';
  color?: ColorTypes;
  label?: string;
  size?: SizeTypes;
  active?: boolean;
  border?: boolean;
}

const Button = ({
  type = 'button',
  width = 'full',
  color = 'primary',
  label,
  size = 'md',
  active = true,
  border = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={!active}
      className={`${getButtonStyle(width, size, color, border)}`}
      {...rest}
    >
      {label}
    </button>
  );
};

const getButtonStyle = (
  width: 'full' | 'max',
  size: SizeTypes,
  color: ColorTypes,
  border: boolean,
) => {
  const widthStyle = {
    full: 'w-full rounded-small py-2',
    max: 'w-max px-2',
  };

  const sizeStyle = {
    sm: 'text-0.85',
    md: 'text-1',
    lg: 'text-1.1',
  };

  const colorStyle = {
    primary: 'bg-primary500 text-white',
    gray: 'bg-black500 text-white',
    'primary-border': 'text-primary500',
    'gray-border': 'text-black600',
    'light-gray': 'bg-[#E8E8E8] text-black700',
  };

  const borderStyle = border ? 'border-1 border-primary500' : '';

  return `font-semibold hover:font-extrabold ${borderStyle} ${widthStyle[width]} ${sizeStyle[size]} ${colorStyle[color]}`;
};

export default Button;
