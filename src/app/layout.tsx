import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import suit from 'next/font/local';
import TabBar from '@/components/common/TabBar';
import AuthSessionProvider from '@/context/AuthSessionProvider';
import { Toaster } from '@/components/ui/toaster';
import SWRContext from '@/context/SWRContext';

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
    images: [
      {
        url: '/images/share.png',
        width: 800,
        height: 400,
        alt: '취준로그',
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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body
        className={`w-screen h-full overflow-x-hidden bg-body ${suitFont.className} antialiased`}
      >
        <main className="min-h-screen mx-auto min-w-[280px] max-w-[500px] bg-white">
          <AuthSessionProvider>
            <SWRContext>{children}</SWRContext>
            <TabBar />
            <Toaster />
          </AuthSessionProvider>
        </main>
      </body>
    </html>
  );
}
