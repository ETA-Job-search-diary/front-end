import { AuthUser } from '@/model/user';

declare module 'next-auth' {
  interface User {
    name: string;
    email: string;
    accessToken?: string;
  }
  interface Session {
    user: User;
  }
}
