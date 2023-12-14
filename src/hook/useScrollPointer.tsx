import { useState, useRef } from 'react';

const useScrollPointer = () => {
  const pointer = useRef<HTMLDivElement>(null);
  const [storedScrollY, setStoredScrollY] = useState(0);
  const [isOpened, setIsOpened] = useState(false);

  const toggleScrollPointer = () => {
    let position = 0;
    setStoredScrollY(window.scrollY);

    if (isOpened) {
      position = storedScrollY;
      setIsOpened(false);
    } else {
      position = pointer.current?.offsetTop || 0;
      setIsOpened(true);
    }

    moveScrollTo(position);
  };

  const moveScrollTo = (position: number) => {
    window.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  };

  return { toggleScrollPointer, pointer };
};

export default useScrollPointer;
