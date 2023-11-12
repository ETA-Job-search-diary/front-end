// import Icon from '@/assets/Icon';

// interface FloatNewButtonProps {
//   onClick: () => void;
// }

// const FloatNewButton = ({ onClick }: FloatNewButtonProps) => {
//   return (
//     <>
//       <div className="absolute bottom-2 w-20 h-20 bg-white flex justify-center items-center rounded-full drop-shadow-tab"></div>
//       <button
//         onClick={onClick}
//         className="bg-primary500 rounded-full w-16 h-16 m-auto drop-shadow-none absolute z-30 bottom-4"
//       >
//         <Icon
//           name="edit"
//           className="stroke-white fill-none w-[30px] f-[30px] m-auto hover:scale-105 transition-all"
//         />
//       </button>
//     </>
//   );
// };

// export default FloatNewButton;

import Icon from '@/assets/Icon';

interface FloatNewButtonProps {
  onClick: () => void;
}

const FloatNewButton = ({ onClick }: FloatNewButtonProps) => {
  return (
    <div className="absolute bottom-2 w-20 h-20 bg-white flex justify-center items-center rounded-full shadow-tab">
      <button
        onClick={onClick}
        className="bg-primary500 rounded-full w-16 h-16 m-auto z-20"
      >
        <Icon
          name="edit"
          className="stroke-white fill-none w-[30px] f-[30px] m-auto hover:scale-105 transition-all"
        />
      </button>
    </div>
  );
};

export default FloatNewButton;
