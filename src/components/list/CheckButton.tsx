import Icon from '../../assets/Icon';

interface CheckButtonProps {
  all?: boolean;
  checked?: boolean;
  onClick: () => void;
}

const CheckButton = ({
  all = false,
  checked = false,
  onClick,
}: CheckButtonProps) => {
  return (
    <button
      aria-label={`${all ? 'all-check' : 'check'}`}
      type="button"
      onClick={onClick}
      className="h-4 w-4"
    >
      <Icon
        name="check"
        className={`h-full w-full hover:animate-wiggle ${
          checked ? 'fill-primary-500' : 'fill-black-100'
        }`}
      />
    </button>
  );
};

export default CheckButton;
