interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  onClick: () => void;
}

const Button = ({
  type = 'button',
  label,
  size = 'md',
  active = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${getButtonStyle(active, size)}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const getButtonStyle = (active: boolean, size: 'sm' | 'md' | 'lg') => {
  const defaultStyle =
    'w-full rounded-small text-white font-bold text-xs web:text-md';

  const sizeStyle = {
    sm: 'h-7 web:h-10 text-xxs web:text-xs',
    md: 'h-11 web:h-16 text-xs web:text-md',
    lg: 'h-16 web:h-20',
  };

  return `${defaultStyle} ${sizeStyle[size]} ${
    active ? 'bg-primary500' : 'bg-black100'
  }`;
};

export default Button;
