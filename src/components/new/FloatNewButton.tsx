import Icon from '@/assets/Icon';
import { memo } from 'react';

interface FloatNewButtonProps {
  onClick: () => void;
}

const FloatNewButton = ({ onClick }: FloatNewButtonProps) => {
  return (
    <div className="absolute bottom-3.5 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-tab">
      <button
        onClick={onClick}
        className="group z-20 m-auto h-16 w-16 rounded-full bg-primary-500 hover:drop-shadow-md"
      >
        <Icon
          aria-label="=new-button"
          name="edit"
          className="m-auto h-[30px] w-[30px] fill-none stroke-white transition-all group-hover:scale-105"
        />
      </button>
    </div>
  );
};

export default memo(FloatNewButton);
