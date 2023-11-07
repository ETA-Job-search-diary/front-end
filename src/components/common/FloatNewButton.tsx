import Icon from '@/assets/Icon';

interface FloatNewButtonProps {
  onClick: () => void;
}
//TODO: 그림자 체크 (위에만 적용되는지 다시 한번 확인 필요)
const FloatNewButton = ({ onClick }: FloatNewButtonProps) => {
  return (
    <div className="fixed bottom-2 w-20 h-20 bg-white flex justify-center items-center rounded-full shadow-tab">
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
