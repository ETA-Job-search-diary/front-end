interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  onClick: () => void;
}

const Button = ({
  type = 'button',
  color = 'primary',
  label,
  size = 'md',
  active = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${getButtonStyle(active, size, color)}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const getButtonStyle = (
  active: boolean,
  size: 'sm' | 'md' | 'lg',
  color: 'primary' | 'secondary',
) => {
  const defaultStyle =
    'w-full rounded-small text-white font-medium text-xs web:text-md hover:font-bold';

  const sizeStyle = {
    sm: 'h-7 web:h-10 text-xxs web:text-sm',
    md: 'h-11 web:h-16 text-xs web:text-md',
    lg: 'h-16 web:h-20',
  };

  const colorStyle = {
    primary: {
      inactive: 'bg-black100',
      active: 'bg-primary500',
    },
    secondary: {
      inactive: 'bg-black100',
      active: 'bg-black100',
    },
  };

  return `${defaultStyle} ${sizeStyle[size]} ${
    active ? colorStyle[color].active : colorStyle[color].inactive
  }`;
};

export default Button;
