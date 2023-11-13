import Icon from './Icon';

interface ListIconProps {
  active?: boolean;
}

const ListIcon = ({ active = false }: ListIconProps) => {
  return (
    <Icon
      aria-label="=list"
      name="list"
      className={`${
        active ? 'stroke-primary500' : 'stroke-black200'
      } ${defaultStyle}`}
    />
  );
};

const defaultStyle = 'fill-none web:w-[22px] hover:scale-110 transition-all';

export default ListIcon;
