/* eslint-disable @typescript-eslint/no-unused-vars */
// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      username?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      isUpgraded?: boolean;
      accessToken?: string;
      subscriptionEndDate?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    isUpgraded?: boolean;
    accessToken?: string;
    subscriptionEndDate?: string;
  }
}
