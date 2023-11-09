import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'gray' | 'border';
  label?: string;
  size?: 'sm' | 'md' | 'xxs';
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
  size: 'sm' | 'md' | 'xxs',
  color: 'primary' | 'secondary' | 'gray' | 'border',
) => {
  const defaultStyle = 'w-full font-medium web:text-md';

  const sizeStyle = {
    xxs: 'w-max px-2 web:px-4 py-0 web:py-0.5 text-[11px] web:text-sm rounded-[3px]',
    sm: 'h-10 web:h-12 text-xxs web:text-sm rounded-small',
    md: 'h-12 web:h-16 text-xs web:text-md rounded-small',
  };
  //TODO: Border버튼 형태 확인
  const colorStyle = {
    primary: {
      inactive: 'bg-black100 text-white',
      active: 'bg-primary500 text-white hover:font-semibold',
    },
    secondary: {
      inactive: 'border border-black100 text-black200',
      active: 'border border-primary500 text-primary500 hover:font-semibold',
    },
    gray: {
      inactive: 'bg-black100 text-black200',
      active: 'bg-black100 text-white hover:font-semibold',
    },
    border: {
      inactive: 'border border-black100 text-black400 bg-body h-6 web:h-[34px]',
      active: 'border border-black100 text-black400 bg-body h-6 web:h-[34px]',
    },
  };

  return `${defaultStyle} ${sizeStyle[size]} ${
    active ? colorStyle[color].active : colorStyle[color].inactive
  }`;
};

export default Button;
