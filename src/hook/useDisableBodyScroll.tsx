import { useLayoutEffect } from 'react';
//** Bug 옆에 스크롤이 생겼다가 사라졌다하는 현상때문에 view port가 움직이는 현상있어서 사용X */
// const useDisableBodyScroll = () => {
//   useLayoutEffect(() => {
//     document.body.style.cssText = `
//       position: fixed;
//       top: -${window.scrollY}px;
//       overflow-y: scroll;
//       width: 100%;`;
//     return () => {
//       const scrollY = document.body.style.top;
//       document.body.style.cssText = '';
//       window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
//     };
//   }, []);
// };
//TODO: Bug fix (크롬 모바일에서 버튼 버블링 현상 보임. PC는 정상.)
const useDisableBodyScroll = () => {
  useLayoutEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const disableScroll = () => {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${
        window.innerWidth - document.body.clientWidth
      }px`;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    };

    const enableScroll = () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };

    const handleScroll = () => {
      requestAnimationFrame(disableScroll);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      enableScroll();
    };
  }, []);
};

// const useDisableBodyScroll = () => {
//   useLayoutEffect(() => {
//     const originalStyles = {
//       overflow: document.body.style.overflow,
//       paddingRight: document.body.style.paddingRight,
//     };

//     const disableScroll = () => {
//       const scrollY = window.scrollY;
//       document.body.style.overflow = 'hidden';
//       document.body.style.paddingRight = `${
//         window.innerWidth - document.body.clientWidth
//       }px`;
//       document.body.style.position = 'fixed';
//       document.body.style.top = `-${scrollY}px`;
//       document.body.style.width = '100%';
//     };

//     const enableScroll = () => {
//       Object.assign(document.body.style, originalStyles);
//     };

//     const handleScroll = () => {
//       requestAnimationFrame(disableScroll);
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       enableScroll();
//     };
//   }, []);
// };
export default useDisableBodyScroll;
