import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'gray' | 'border' | 'primary-border';
  label?: string;
  size?: 'sm' | 'md' | 'xs' | 'xxs';
  active?: boolean;
}

const Button = ({
  type = 'button',
  color = 'primary',
  label,
  size = 'md',
  active = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${getButtonStyle(active, size, color)}`}
      {...rest}
    >
      {label}
    </button>
  );
};

const getButtonStyle = (
  active: boolean,
  size: 'sm' | 'md' | 'xs' | 'xxs',
  color: 'primary' | 'secondary' | 'gray' | 'border' | 'primary-border',
) => {
  const defaultStyle = 'w-full font-medium';

  const sizeStyle = {
    xxs: 'w-max px-2 text-xxs xs:text-[11px]',
    xs: 'w-max px-3 text-sm font-semibold',
    sm: 'h-10 web:h-12 text-sm rounded-small',
    md: 'h-12 web:h-16 text-sm rounded-small',
  };

  const colorStyle = {
    primary: {
      inactive: 'bg-black100 text-white',
      active: 'bg-primary500 text-white hover:font-semibold',
    },
    'primary-border': {
      inactive: 'text-primary500 hover:font-extrabold',
      active: 'text-primary500 hover:font-extrabold',
    },
    secondary: {
      inactive: 'border-[1px] border-black100 text-black200',
      active:
        'border-[1px] border-primary500 text-primary500 hover:font-semibold',
    },
    gray: {
      inactive: 'bg-black100 text-black200',
      active: 'bg-black100 text-white hover:font-semibold',
    },
    border: {
      inactive:
        'border-[1px] border-black100 text-black400 bg-body rounded-[3px] xs:h-6 h-7',
      active:
        'border-[1px] border-black100 text-black400 bg-white rounded-[3px] xs:h-6 h-7',
    },
  };

  return `${defaultStyle} ${sizeStyle[size]} ${
    active ? colorStyle[color].active : colorStyle[color].inactive
  }`;
};

export default Button;
