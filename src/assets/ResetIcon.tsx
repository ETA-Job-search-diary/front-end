import Icon from './Icon';

const ResetIcon = () => {
  return (
    <Icon
      name="close"
      className={`h-4 w-4 fill-black-900 web:h-5 web:w-5 ${defaultStyle}`}
    />
  );
};

const defaultStyle = 'hover:scale-110 transition-all';

export default ResetIcon;
