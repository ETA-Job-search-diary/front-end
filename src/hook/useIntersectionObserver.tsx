import { useState, useEffect } from 'react';

interface useIntersectionObserverProps {
  isReachingEnd: boolean;
  nextPage: () => void;
}

const useIntersectionObserver = ({
  isReachingEnd,
  nextPage,
}: useIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!target) return;
    const onIntersect: IntersectionObserverCallback = ([entry]) => {
      if (isReachingEnd) return;
      if (entry.isIntersecting) nextPage();
    };
    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [target, isReachingEnd]);

  return { setTarget };
};

export default useIntersectionObserver;
