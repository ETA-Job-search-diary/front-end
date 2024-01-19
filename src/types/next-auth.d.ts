import NextAuth from "next-auth";

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
