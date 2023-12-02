import { getServerSession } from 'next-auth';
import { cache } from 'react';
import { authOptions } from '@/lib/authOptions';

import 'server-only';

export const getToken = cache(async () => {
  const session = await getServerSession(authOptions);
  const token = session?.user.accessToken;
  return { token };
});
