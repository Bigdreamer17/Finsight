/* eslint-disable @typescript-eslint/no-unused-vars */
// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";
import type { userRoleType } from "./types";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      username?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      role?: userRoleType;
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
    role?: userRoleType;
    isUpgraded?: boolean;
    accessToken?: string;
    subscriptionEndDate?: string;
  }
}
