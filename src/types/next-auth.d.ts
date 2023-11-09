import { AuthUser } from '@/model/user';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    accessToken?: string;
  }
  interface Session {
    user: User;
  }
}
