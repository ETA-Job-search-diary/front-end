import axios from 'axios';
import { NextAuthOptions } from 'next-auth';

import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import { setStorage } from '@/service/login';

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
      }
      return token;
    },
    async session({ session, token, user }) {
      const sessionUser = session?.user;
      if (sessionUser) {
        session.user = {
          name: sessionUser.name,
          email: sessionUser.email,
          id: token.id as string,
        };
      }
      return session;
    },
    async signIn({ user }) {
      const { id, name, email } = user;
      try {
        if (!email) return false;
        const { data } = await axios.post(
          'http://track.bugilabs.com:3905/api/auth/login',
          { identifier: id, name, email },
        );
        setStorage({ key: 'token', value: data.token });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
