import { BeforeInstallPromptEvent } from '@/types/window';
import { useCallback, useEffect, useRef, useState } from 'react';

const A2HS_DELAY_TIME = 5000;
const A2HS_WAIT_TIME = 1000 * 60 * 60 * 24 * 7;

const useA2HS = () => {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [isShown, setIsShown] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  const isActivated = () => {
    const A2HS = localStorage.getItem('A2HS');
    if (!A2HS) return true;

    const { active, time } = JSON.parse(A2HS);
    const now = new Date().getTime();

    if (now - time > A2HS_WAIT_TIME) {
      localStorage.removeItem('A2HS');
      return true;
    }

    if (active) return true;
    return false;
  };

  const addLater = useCallback(() => {
    localStorage.setItem(
      'A2HS',
      JSON.stringify({
        active: false,
        time: new Date().getTime(),
      }),
    );
    setIsShown(false);
  }, []);

  const installApp = useCallback(() => {
    deferredPrompt.current?.prompt();
    localStorage.setItem(
      'A2HS',
      JSON.stringify({
        active: false,
        time: new Date().getTime(),
      }),
    );
    setIsShown(false);
  }, []);

  const closeA2HS = useCallback(() => {
    setIsShown(false);
  }, []);

  useEffect(() => {
    const beforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setTimeout(() => {
        const isInstalled =
          window.matchMedia('(display-mode: standalone)').matches ||
          ('standalone' in navigator && navigator.standalone);

        if (isInstalled) {
          setIsShown(false);
          return;
        }

        if (isActivated()) {
          setIsShown(true);
        }
      }, A2HS_DELAY_TIME);
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPrompt);
    return () =>
      window.removeEventListener('beforeinstallprompt', beforeInstallPrompt);
  }, []);

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) setIsSafari(true);
    else return;

    setTimeout(() => {
      const isInstalled =
        window.matchMedia('(display-mode: standalone)').matches ||
        ('standalone' in navigator && navigator.standalone);

      if (isInstalled) {
        setIsShown(false);
        return;
      }

      if (isActivated()) {
        setIsShown(true);
      }
    }, A2HS_DELAY_TIME);
  }, []);

  return {
    isSafari,
    isShown,
    installApp,
    addLater,
    closeA2HS,
  };
};

export default useA2HS;
