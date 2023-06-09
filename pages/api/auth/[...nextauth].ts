import { addUser, getUserByUsername, getUserByUsernameLoing } from '@/service/user';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { signIn } from 'next-auth/react';
import { userInfo } from 'os';
import Credentials from 'next-auth/providers/credentials';

export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),

    

    // Credentials({
   
     
    //   credentials: {
   
    //     email: {
    //       label: 'Email',
    //       type: 'text',
    //     },
      
    //     name: {
    //     label: 'text',
    //     type: 'text',
    //     placeholder: "비밀번호를 입력하세요.",
    //   },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email  || !credentials?.name) {
    //       throw new Error('Email and password required');
    //     }

    //     const exUser = await getUserByUsernameLoing(credentials.email);

    //     return exUser;
    //   }
    // })
  














  ],
    // ...add more providers here

  pages:{
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user: { id, name, image, email } }) {
      if (!email) {
        return false;
      }
      addUser({
        
        id,
        name: name || '',
        image,
        email,
        username: email.split('@')[0],
       
      });
      return true;
    },
    async session({ session,token}) {
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
         id:token.id as string,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.email?.split('@')[0] || '';
      }
      return token;
    },
  
  }

  
};
export default NextAuth(authOptions);
