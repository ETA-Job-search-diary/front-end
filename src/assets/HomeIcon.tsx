import Icon from './Icon';

interface HomeIconProps {
  active?: boolean;
}

const HomeIcon = ({ active = false }: HomeIconProps) => {
  return (
    <Icon
      name="home"
      aria-label="=home"
      className={`${
        active ? 'stroke-primary500' : 'stroke-black200'
      } ${defaultStyle}`}
    />
  );
};

const defaultStyle = 'fill-none hover:scale-110 transition-all';

export default HomeIcon;
