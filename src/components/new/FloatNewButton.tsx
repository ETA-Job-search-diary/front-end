import Icon from '@/assets/Icon';

interface FloatNewButtonProps {
  onClick: () => void;
}

const FloatNewButton = ({ onClick }: FloatNewButtonProps) => {
  return (
    <>
      <div className="fixed bottom-2 w-20 h-20 bg-white rounded-full" />
      <button
        type="button"
        onClick={onClick}
        className="z-30 absolute bottom-4 bg-primary500 rounded-full w-16 h-16 m-auto"
      >
        <Icon
          name="edit"
          className="stroke-white fill-none w-[30px] f-[30px] m-auto hover:scale-110 transition-all"
        />
      </button>
    </>
  );
};

export default FloatNewButton;
