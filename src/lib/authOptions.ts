import axios from 'axios';
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
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      const sessionUser = session?.user;
      if (sessionUser) {
        session.user = {
          name: sessionUser.name,
          email: sessionUser.email,
          id: token.id as string,
          accessToken: token.accessToken as string,
        };
      }
      return session;
    },
    async signIn({ user }) {
      const { name, email } = user;
      try {
        if (!email) return false;
        const { data } = await axios.post(
          `https://newjoblog.bugilabs.com/api/auth/login`,
          { name, email },
        );
        user.accessToken = data.token;
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
