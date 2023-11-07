import { NextAuthOptions } from 'next-auth';

import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions: NextAuthOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENTID ?? '',
      clientSecret: process.env.NAVER_SECRET ?? '',
      profile({ response }) {
        return {
          id: response.id.toString().slice(1),
          name: response.name,
          email: response.email,
        };
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENTID ?? '',
      clientSecret: process.env.KAKAO_SECRET ?? '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.kakao_account.profile.nickname,
          email: profile.kakao_account.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT', token, user);
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('SESSION', session, token);
      const user = session?.user;
      if (user) {
        session.user = {
          id: token.id,
          name: user.name,
          email: user.email,
        };
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      //** 회원 가입 로직 POST */
      console.log('signIn', user, account, profile, email, credentials);
      return true; // 로그인 성공시 true, 실패시 false
    },
  },
};
