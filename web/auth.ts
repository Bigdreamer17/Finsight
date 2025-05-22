/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      session.user.firstName = token.firstName as string;
      session.user.lastName = token.lastName as string;
      session.user.email = token.email as string;
      session.user.isUpgraded = token.isUpgraded as boolean;
      session.user.accessToken = token.accessToken as string;
      session.user.subscriptionEndDate = token.subscriptionEndDate as Date;

      return session;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        if (!account?.id_token) {
          throw new Error("Missing Google access token");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL ?? ""}/signin/google`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: account.id_token }),
          },
        );

        if (!res.ok) {
          throw new Error("Failed to login user");
        }

        type BackendUser = {
          id: string;
          username: string;
          firstName: string;
          lastName: string;
          email: string;
          isUpgraded: boolean;
          accessToken: string;
          subscriptionEndDate: Date;
        };

        const backendUser: BackendUser = await res.json();

        token.id = backendUser.id;
        token.username = backendUser.username;
        token.firstName = backendUser.firstName;
        token.lastName = backendUser.lastName;
        token.email = backendUser.email;
        token.isUpgraded = backendUser.isUpgraded;
        token.accessToken = backendUser.accessToken;
        token.subscriptionEndDate = backendUser.subscriptionEndDate;
      }

      return token;
    },
  },
} satisfies NextAuthConfig);
