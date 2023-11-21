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
    <button type="button" onClick={onClick} className="w-4 h-4">
      <Icon
        aria-label={`${all ? 'all-check' : 'check'}`}
        name="check"
        className={`w-full h-full hover:animate-wiggle ${
          checked ? 'fill-primary500' : 'fill-black100'
        }`}
      />
    </button>
  );
};

export default CheckButton;
