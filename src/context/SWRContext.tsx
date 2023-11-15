'use client';

import { fetcher, fetchWithToken } from '@/lib/fetcher';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

interface SWRProviderProps {
  children: ReactNode;
}

export default function SWRContext({ children }: SWRProviderProps) {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

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
