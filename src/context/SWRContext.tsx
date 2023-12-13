'use client';

import useSession from '@/hook/useSession';
import { fetchWithToken } from '@/lib/fetcher';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

interface SWRProviderProps {
  children: ReactNode;
}

export default function SWRContext({ children }: SWRProviderProps) {
  const { token } = useSession();

  if (!token) return <>{children}</>;

  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetchWithToken(url, token),
      }}
    >
      {children}
    </SWRConfig>
  );
}
