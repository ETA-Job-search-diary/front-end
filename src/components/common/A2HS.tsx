'use client';

import Icon from '@/assets/Icon';
import useA2HS from '@/hook/useA2HS';
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet';
import Button from './Button';
//TODO: Safari에서는 설치 안내 화면 띄우기
const A2HS = () => {
  const { isShown, isSafari, installApp, closeA2HS } = useA2HS();
  if (!isShown) return null;

  const handleAddToHomeScreen = () => installApp();
  const handleAddToHomeScreenLater = () => closeA2HS();

  return (
    <Sheet defaultOpen>
      <SheetTitle className="sr-only">A2HS</SheetTitle>
      <SheetContent
        side="bottom"
        hasCloseButton={false}
        className="rounded-t-3xl border-none pb-14 pt-16 outline-none"
      >
        <Icon
          name="mainCharacter"
          className="absolute left-1/2 w-32 -translate-x-1/2 -translate-y-28"
        />
        <div className="m-auto flex max-w-[70%] flex-col items-center justify-center gap-3">
          <p className="whitespace-pre-line text-center text-1 leading-6 text-black-900">
            홈 화면에 <b>취준로그 앱</b>을 추가하고{`\n`}
            편리하게 이용해 보세요 :)
          </p>
          <Button
            variant="primary"
            label="홈 화면에 추가하기"
            onClick={handleAddToHomeScreen}
          />
          <button onClick={handleAddToHomeScreenLater}>
            <span className="border-b border-black-500 text-0.9 text-black-500">
              그냥 볼게요
            </span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default A2HS;
