import { BASE_URL } from '@/service/api';
import axios from 'axios';
import type { NextAuthOptions } from 'next-auth';

import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

const NaverClienId = process.env.NAVER_CLIENTID ?? '';
const NaverSecret = process.env.NAVER_SECRET ?? '';
const KakaoClientId = process.env.KAKAO_CLIENTID ?? '';
const KakaoSecret = process.env.KAKAO_SECRET ?? '';

export const authOptions: NextAuthOptions = {
  providers: [
    NaverProvider({
      clientId: NaverClienId,
      clientSecret: NaverSecret,
      profile({ response: { id, name, email } }) {
        return {
          id: id.toString().slice(1), // naver id starts with '-' so slice it
          name,
          email,
        };
      },
    }),
    KakaoProvider({
      clientId: KakaoClientId,
      clientSecret: KakaoSecret,
      profile({ id, kakao_account: { profile, email } }) {
        return {
          id,
          name: profile.nickname,
          email,
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
      if (!token.accessToken && user.accessToken) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        return token;
      } else if (token.accessToken) {
        return token;
      }
      throw new Error('Callback jwt error');
    },
    async session({ session, token }) {
      const sessionUser = session?.user;
      if (sessionUser) {
        session.user = {
          id: token.id as string,
          name: sessionUser.name,
          email: sessionUser.email,
          accessToken: token.accessToken as string,
        };
        return session;
      }
      throw new Error('Callback session error');
    },
    async signIn({ user }) {
      const { name, email } = user;
      try {
        if (!email) return false;
        const { data } = await axios.post(`${BASE_URL}/auth/login`, {
          name,
          email,
        });
        user.accessToken = data.token;
        return true;
      } catch (err) {
        return false;
      }
    },
  },
};
