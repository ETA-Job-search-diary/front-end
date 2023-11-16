import Icon from './Icon';

const ResetIcon = () => {
  return (
    <Icon
      name="close"
      aria-label="=close"
      className={`w-4 h-4 web:w-5 web:h-5 fill-black900 ${defaultStyle}`}
    />
  );
};

const defaultStyle = 'hover:scale-110 transition-all';

export default ResetIcon;
