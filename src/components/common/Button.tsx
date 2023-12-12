import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'gray' | 'border' | 'primary-border';
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
  color: 'primary' | 'gray' | 'border' | 'primary-border',
) => {
  const defaultStyle = 'font-medium';

  const sizeStyle = {
    xxs: 'w-max px-2 text-xxs xs:text-xxxs',
    xs: 'text-xxs font-semibold',
    sm: 'w-max text-sm xs:text-xxs font-semibold',
    md: 'text-sm rounded-small',
  };

  const colorStyle = {
    primary: {
      inactive:
        'border-[1px] border-primary500 text-primary500 hover:font-semibold rounded-small h-10 w-full',
      active:
        'bg-primary500 text-white hover:font-semibold rounded-small h-10 w-full',
    },
    'primary-border': {
      inactive: 'text-black600 hover:font-extrabold',
      active: 'text-primary500 hover:font-extrabold',
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
