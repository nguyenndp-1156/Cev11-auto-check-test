// @ts-nocheck
/* eslint-disable */
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    accessTokenExpiry: string;
    error: string;
  }
}
