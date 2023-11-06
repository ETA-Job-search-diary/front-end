import Icon from './Icon';

interface ListIconProps {
  active?: boolean;
}

const ListIcon = ({ active = false }: ListIconProps) => {
  return (
    <>
      {active ? (
        <Icon
          name="list"
          className="stroke-primary500 fill-none web:w-[22px]"
        />
      ) : (
        <Icon name="list" className="stroke-black200 fill-none web:w-[22px]" />
      )}
    </>
  );
};

export default ListIcon;
