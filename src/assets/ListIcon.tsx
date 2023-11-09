import Icon from './Icon';

interface ListIconProps {
  active?: boolean;
}

const ListIcon = ({ active = false }: ListIconProps) => {
  return (
    <>
      {active ? (
        <Icon name="list" className={`stroke-primary500 ${defaultStyle}`} />
      ) : (
        <Icon name="list" className={`stroke-black200 ${defaultStyle}`} />
      )}
    </>
  );
};

const defaultStyle = 'fill-none web:w-[22px] hover:scale-105 transition-all';

export default ListIcon;
