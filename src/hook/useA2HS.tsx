import { BeforeInstallPromptEvent } from '@/types/window';
import { useCallback, useEffect, useRef, useState } from 'react';

const A2HS_DELAY_TIME = 5000;
const A2HS_WAIT_TIME = 1000 * 60 * 60 * 24 * 7;

const useA2HS = () => {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [isShown, setIsShown] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  const isActive = () => {
    const A2HS = localStorage.getItem('A2HS');
    if (!A2HS) return true;

    const { active, time } = JSON.parse(A2HS);
    if (active) return true;

    const now = new Date().getTime();
    return now - time > A2HS_WAIT_TIME;
  };

  const closeA2HS = useCallback(() => {
    localStorage.setItem(
      'A2HS',
      JSON.stringify({
        active: false,
        time: new Date().getTime(),
      }),
    );
    setIsShown(false);
  }, []);

  const installApp = () => {
    //TODO: Safari에서는 설치 안내 화면 띄우기
    // if (/iP(hone|od|ad)/.test(navigator.platform)) {
    //   setIsSafari(true);
    //   return;
    // }
    setIsShown(false);
    deferredPrompt.current?.prompt();
  };

  useEffect(() => {
    const beforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setTimeout(() => {
        if (
          !isActive() ||
          (window.matchMedia &&
            window.matchMedia('(display-mode: standalone)').matches)
        )
          return;
        setIsShown(true);
      }, A2HS_DELAY_TIME);
    };
    window.addEventListener('beforeinstallprompt', beforeInstallPrompt);
    return () =>
      window.removeEventListener('beforeinstallprompt', beforeInstallPrompt);
  }, []);

  return {
    isSafari,
    isShown,
    installApp,
    closeA2HS,
  };
};

export default useA2HS;
