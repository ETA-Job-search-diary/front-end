import A2HS from '@/components/common/A2HS';
import TabBar from '@/components/common/TabBar';
import { Toaster } from '@/components/ui/toaster';
import { METADATA, THEME_COLOR } from '@/constants/metadata';
import AuthSessionProvider from '@/context/AuthSessionProvider';
import SWRContext from '@/context/SWRContext';
import ThemeProvider from '@/context/ThemeProvider';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import suit from 'next/font/local';
import { ReactNode } from 'react';
import './globals.css';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
const GTM_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER;

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
  metadataBase: new URL(METADATA.metadataBase),
  title: {
    default: METADATA.siteName,
    template: '%s | 취준로그',
  },
  description: METADATA.description.home,
  manifest: METADATA.manifest,
  openGraph: {
    type: 'website',
    title: METADATA.siteName,
    description: METADATA.description.home,
    locale: 'ko_KR',
    url: METADATA.metadataBase,
    siteName: METADATA.siteName,
  },
  verification: METADATA.verification,
  appleWebApp: {
    statusBarStyle: 'black-translucent',
    title: METADATA.siteName,
    startupImage: METADATA.startupImage,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: THEME_COLOR.home,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <GoogleAnalytics gaId={GA_TRACKING_ID ?? ''} />
      <GoogleTagManager gtmId={GTM_TRACKING_ID ?? ''} />
      <body
        className={`h-full w-screen overflow-x-hidden web:bg-body ${suitFont.className} antialiased scrollbar-none web:scrollbar-thin web:scrollbar-track-gray-100 web:scrollbar-thumb-gray-300 web:scrollbar-thumb-rounded-sm web:hover:scrollbar-thumb-gray-400`}
      >
        <ThemeProvider>
          <main className="mx-auto min-h-screen min-w-280 max-w-500">
            <AuthSessionProvider>
              <SWRContext>{children}</SWRContext>
              <TabBar />
            </AuthSessionProvider>
            <Toaster />
            <A2HS />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
