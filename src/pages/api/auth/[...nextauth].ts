import NextAuth from 'next-auth';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [],
  callbacks: {},
  pages: {},
};

export default NextAuth(authOptions);
