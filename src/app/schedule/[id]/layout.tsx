import { METADATA, THEME_COLOR } from '@/constants/metadata';
import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: METADATA.title.detail,
  description: METADATA.description.detail,
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR.default,
};

interface DetaillayoutProps {
  children: ReactNode;
}
export default function Detaillayout({ children }: DetaillayoutProps) {
  return (
    <section className="h-full min-h-screen w-full bg-white pb-[calc(env(safe-area-inset-bottom)+90px)]">
      {children}
    </section>
  );
}
