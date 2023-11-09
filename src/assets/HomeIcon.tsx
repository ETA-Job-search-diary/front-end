import Icon from './Icon';

interface HomeIconProps {
  active?: boolean;
}

const HomeIcon = ({ active = false }: HomeIconProps) => {
  return (
    <>
      {active ? (
        <Icon name="home" className={`stroke-primary500 ${defaultStyle}`} />
      ) : (
        <Icon name="home" className={`stroke-black200 ${defaultStyle}`} />
      )}
    </>
  );
};

const defaultStyle = 'fill-none hover:scale-110 transition-all';

export default HomeIcon;
