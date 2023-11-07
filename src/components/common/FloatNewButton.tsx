import Icon from '@/assets/Icon';

interface FloatNewButtonProps {
  onClick: () => void;
}

const FloatNewButton = ({ onClick }: FloatNewButtonProps) => {
  return (
    <div className="absolute bottom-4 w-20 h-20 bg-white flex justify-center items-center rounded-full shadow-tab">
      <button
        onClick={onClick}
        className="bg-primary500 rounded-full w-16 h-16 m-auto"
      >
        <Icon
          name="edit"
          className="stroke-white fill-none w-[30px] f-[30px] m-auto"
        />
      </button>
    </div>
  );
};

export default FloatNewButton;
