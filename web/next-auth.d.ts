/* eslint-disable @typescript-eslint/no-unused-vars */
// types/next-auth.d.ts or @types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      isUpgraded?: boolean | null; // 👈 Add this line
    };
  }
}
