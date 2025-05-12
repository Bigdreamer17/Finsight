import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day (in seconds)
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 1 day (in seconds)
  },
} satisfies NextAuthConfig);
