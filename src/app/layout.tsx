import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import suit from 'next/font/local';
import TabBar from '@/components/common/TabBar';
import AuthSessionProvider from '@/context/AuthSessionProvider';

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
  title: {
    default: '취준로그',
    template: '%s | 취준로그',
  },
  description: '취업에 필요한 정보를 기록하고 관리하는 서비스', //TODO: 기획 - 수정
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
        className={`w-screen h-screen overflow-x-hidden bg-body ${suitFont.className} antialiased`}
      >
        <main className="min-h-screen mx-auto min-w-[280px] max-w-[500px] bg-white">
          <AuthSessionProvider>
            {children}
            <TabBar />
          </AuthSessionProvider>
        </main>
      </body>
    </html>
  );
}
