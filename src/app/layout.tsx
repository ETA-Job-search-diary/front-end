import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import suit from 'next/font/local';
import TabBar from '@/components/common/TabBar';
import AuthSessionProvider from '@/context/AuthSessionProvider';
import { Toaster } from '@/components/ui/toaster';
import SWRContext from '@/context/SWRContext';
import ThemeProvider from '@/context/ThemeProvider';

const suitFont = suit({
  src: [
    {
      path: './fonts/SUIT-Light.otf',
      style: 'normal',
      weight: '300',
    },
    {
      path: './fonts/SUIT-Regular.otf',
      style: 'normal',
      weight: '400',
    },
    {
      path: './fonts/SUIT-SemiBold.otf',
      style: 'normal',
      weight: '600',
    },
    {
      path: './fonts/SUIT-Bold.otf',
      style: 'normal',
      weight: '700',
    },
  ],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://newjoblog.vercel.app'),
  title: {
    default: '취준로그',
    template: '%s | 취준로그',
  },
  description: '취업에 필요한 정보를 기록해보세요! 당신의 취뽀를 기원합니다.',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    title: '취준로그',
    description: '취업에 필요한 정보를 기록해보세요! 당신의 취뽀를 기원합니다.',
    locale: 'ko_KR',
    url: 'https://newjoblog.vercel.app',
    siteName: '취준로그',
  },
  verification: {
    google: '0awmBR3ymVu_pHcxrXA2oF1zZjrwGRuxAlQdsF2OMMM',
    other: {
      'naver-site-verification': ['2cb9c39c2a52ef9d39338fe9f916e79553d87508'],
    },
  },
  appleWebApp: {
    statusBarStyle: 'black-translucent',
    title: '취준로그',
    startupImage: [
      {
        url: '/images/startup/iphone5_splash.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/images/startup/iphone6_splash.png',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/images/startup/iphoneplus_splash.png',
        media:
          '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/images/startup/iphonex_splash.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/images/startup/iphonexr_splash.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/images/startup/iphonexsmax_splash.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/images/startup/ipad_splash.png',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/images/startup/ipadpro1_splash.png',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/images/startup/ipadpro3_splash.png',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/images/startup/ipadpro2_splash.png',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/images/startup/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/images/startup/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/images/startup/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png',
        media:
          '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/images/startup/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png',
        media:
          '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/images/startup/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png',
        media:
          '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/images/startup/iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png',
        media:
          '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`w-screen h-full overflow-x-hidden web:bg-body ${suitFont.className} antialiased`}
      >
        <main className="min-h-screen mx-auto min-w-[280px] max-w-[500px] bg-white flex flex-col pt-[calc(env(safe-area-inset-top))]">
          <ThemeProvider>
            <AuthSessionProvider>
              <SWRContext>{children}</SWRContext>
              <TabBar />
              <Toaster />
            </AuthSessionProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
