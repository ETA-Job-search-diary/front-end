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
    <button type="button" onClick={onClick}>
      <Icon
        aria-label={`${all ? 'all-check' : 'check'}`}
        name="check"
        className={`w-5 h-5 web:w-4 web:h-4 hover:animate-wiggle ${
          checked ? 'fill-primary500' : 'fill-black100'
        }`}
      />
    </button>
  );
};

export default CheckButton;
