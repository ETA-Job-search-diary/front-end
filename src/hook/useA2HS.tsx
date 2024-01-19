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
    setIsShown(false);
    deferredPrompt.current?.prompt();
  }, []);

  const closeA2HS = useCallback(() => {
    setIsShown(false);
  }, []);

  useEffect(() => {
    const beforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setTimeout(() => {
        const isStandalone = window.matchMedia(
          '(display-mode: standalone)',
        ).matches;
        if (isStandalone) return;

        if (isActive()) {
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

    setTimeout(() => {
      if ('standalone' in navigator) {
        if (navigator.standalone) {
          setIsShown(false);
          return;
        }
      }
      setIsShown(true);
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
