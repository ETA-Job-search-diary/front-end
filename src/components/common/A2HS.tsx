'use client';

import Icon from '@/assets/Icon';
import useA2HS from '@/hook/useA2HS';
import Image from 'next/image';
import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { Sheet, SheetContent } from '../ui/sheet';
import Button from './Button';
import NavBar from './NavBar';

interface A2HSStepProps {
  number: number;
  title: ReactNode;
  children: ReactNode;
}

const A2HS = () => {
  const { isShown, isSafari, installApp, addLater, closeA2HS } = useA2HS();
  const [showGuide, setShowGuide] = useState(false);

  const handleAddToHomeScreen = () => installApp();

  const handleAddToHomeScreenLater = () => addLater();

  const handleSafariGiuid = () => {
    setShowGuide(true);
    closeA2HS();
  };

  return (
    <>
      {!showGuide && isShown && (
        <Sheet defaultOpen>
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
                onClick={isSafari ? handleSafariGiuid : handleAddToHomeScreen}
              />
              <button onClick={handleAddToHomeScreenLater}>
                <span className="border-b border-black-500 text-0.9 text-black-500">
                  그냥 볼게요
                </span>
              </button>
            </div>
          </SheetContent>
        </Sheet>
      )}
      {showGuide && <A2HS.Guide onClose={() => setShowGuide(false)} />}
    </>
  );
};

A2HS.Guide = ({ onClose }: { onClose: () => void }) => {
  return createPortal(
    <section className="fixed top-0 z-40 h-screen w-full min-w-280 max-w-500 overflow-y-auto bg-gray-100 pb-24">
      <div className="sticky top-0 z-50 bg-gray-100">
        <NavBar
          leftSection={
            <button
              aria-label="A2HS guide close button"
              className="p-4"
              onClick={onClose}
            >
              <Icon name="close" className="h-5 w-5 fill-black-900" />
            </button>
          }
          label="홈 화면에 추가"
        />
      </div>
      <div className="px-page text-black-900">
        <h1 className=" whitespace-pre-line py-6 pl-2 text-1.2">
          홈 화면에 <b>취준로그 앱</b>을{`\n`}
          추가해보세요!
        </h1>
        <div className="relative w-full overflow-hidden rounded-2xl border border-black-50 bg-white px-4 pb-5 pt-6 shadow-box">
          <div className="absolute left-0 top-0 border-b-[3.2rem] border-l-[3.2rem] border-b-transparent border-l-primary-500" />
          <span className="absolute left-2 top-2 rotate-[-42.95deg] text-0.8 font-extrabold text-white">
            iOS
          </span>
          <div className="flex h-max flex-col divide-y-1 divide-gray-50">
            <A2HS.Step
              number={1}
              title={
                <>
                  브라우저 하단 <b>공유 버튼</b> 탭
                </>
              }
            >
              <div className="flex flex-col gap-3 rounded-lg bg-gray-200 py-3">
                <div className="mx-4 grid grid-cols-[auto_1fr_auto] items-center rounded-lg bg-gray-100 bg-opacity-80 px-4 py-2 shadow-box">
                  <div className="w-max">
                    <span className="text-0.75 font-semibold">가</span>
                    <span className="text-0.85 font-bold">가</span>
                  </div>
                  <div className="text-center text-0.9 font-semibold">
                    newjoblog.vercel.app
                  </div>
                  <Icon
                    name="arrowSpin"
                    className="mx-auto w-4 fill-black-900"
                  />
                </div>
                <div className="relative mx-4 flex justify-between">
                  <Icon name="left" className=" w-4 fill-[#4693FF]" />
                  <Icon name="right" className="w-4 fill-black-100" />
                  <p />
                  <Icon name="book" className="w-4 stroke-[#4693FF]" />
                  <Icon name="copy" className="w-4 stroke-[#4693FF]" />
                  <div className="absolute -top-4 left-1/2 h-12 w-12 -translate-x-1/2 rounded-lg bg-gray-200 p-1.5 shadow-md">
                    <Icon name="share" className="mx-auto stroke-[#4693FF]" />
                  </div>
                </div>
              </div>
            </A2HS.Step>
            <A2HS.Step
              number={2}
              title={
                <>
                  <b>홈 화면에 추가</b> 선택
                </>
              }
            >
              <div className="rounded-lg bg-[#EFF5F1] p-4">
                <div className="flex justify-between rounded-md bg-white p-4 shadow-sm">
                  <span className="text-0.9 font-semibold text-black-900">
                    홈 화면에 추가
                  </span>
                  <Icon name="plusSquare" className="w-4 stroke-black-900" />
                </div>
              </div>
            </A2HS.Step>
            <A2HS.Step
              number={3}
              title={
                <>
                  홈 화면에서 <b>앱 실행</b>
                </>
              }
            >
              <div className="relative">
                <Image
                  src="/images/step3-bg.webp"
                  alt="a2hs step3"
                  width={500}
                  height={500}
                />
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1">
                  <Icon name="app" className="w-8 rounded-md" />
                  <span className="text-0.7 font-bold text-white">
                    취준로그
                  </span>
                </div>
              </div>
            </A2HS.Step>
          </div>
        </div>
      </div>
    </section>,
    document.body.querySelector('main')!,
  );
};

A2HS.Step = ({ number, title, children }: A2HSStepProps) => {
  return (
    <div className="flex min-h-[11rem] flex-col justify-center gap-3">
      <div className="flex items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-50">
          <span className="text-0.75 font-extrabold text-primary-500">
            {number}
          </span>
        </div>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default A2HS;
