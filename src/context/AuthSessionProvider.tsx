'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface AuthSessionProviderProps {
  children: ReactNode;
}

const AuthSessionProvider = ({ children }: AuthSessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthSessionProvider;
