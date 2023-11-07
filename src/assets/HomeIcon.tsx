import Icon from './Icon';

interface HomeIconProps {
  active?: boolean;
}
const HomeIcon = ({ active = false }: HomeIconProps) => {
  return (
    <>
      {active ? (
        <Icon name="home" className="stroke-primary500 fill-none" />
      ) : (
        <Icon name="home" className="stroke-black200 fill-none" />
      )}
    </>
  );
};

export default HomeIcon;
