import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'gray' | 'border' | 'secondary';
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
      disabled={!active}
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
  color: 'primary' | 'gray' | 'border' | 'secondary',
) => {
  const defaultStyle = 'font-medium';

  const sizeStyle = {
    xxs: 'w-max px-2 text-xxs xs:text-xxxs',
    xs: 'text-xxs web:text-xs font-semibold',
    sm: 'w-max text-sm xs:text-xxs font-semibold',
    md: 'text-sm rounded-small',
  };

  const colorStyle = {
    primary: {
      inactive:
        'border-1 border-primary500 text-primary500 hover:font-semibold rounded-small h-9 w-full',
      active:
        'bg-primary500 text-white hover:font-semibold rounded-small h-9 w-full',
    },
    secondary: {
      inactive: 'text-black600 hover:font-extrabold',
      active: 'text-primary500 hover:font-extrabold',
    },
    gray: {
      inactive: 'bg-[#E8E8E8] text-black700 rounded-small h-9 w-full',
      active:
        'bg-black100 text-white hover:font-semibold rounded-small h-9 w-full',
    },
    border: {
      inactive:
        'border-1 border-black100 text-black400 bg-body rounded-[3px] xs:h-6 h-7',
      active:
        'border-1 border-black100 text-black400 bg-white rounded-[3px] xs:h-6 h-7',
    },
  };

  return `${defaultStyle} ${sizeStyle[size]} ${
    active ? colorStyle[color].active : colorStyle[color].inactive
  }`;
};

export default Button;
