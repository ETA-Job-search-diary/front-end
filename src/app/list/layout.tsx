import { METADATA, THEME_COLOR } from '@/constants/metadata';
import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: METADATA.title.list,
  description: METADATA.description.list,
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR.default,
};

interface ListPagelayoutProps {
  children: ReactNode;
}

export default function ListPagelayout({ children }: ListPagelayoutProps) {
  return (
    <section className="flex min-h-screen w-full flex-col bg-white pt-safe-top scrollbar-none web:scrollbar-thin">
      {children}
    </section>
  );
}
