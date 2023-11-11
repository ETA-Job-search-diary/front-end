'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient({
  /* options */
});

function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default Providers;
