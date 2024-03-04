import { useCallback, useState } from 'react';

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return { isOpen, onToggle, onOpen, onClose };
};

export default useToggle;
