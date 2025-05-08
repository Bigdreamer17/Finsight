import type { Metadata } from "next";
import "./globals.css";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SessionProvider } from "next-auth/react";
import { plusJakartaSans } from "./fonts";

export const metadata: Metadata = {
  title: "FinSight",
  description: "FinSight",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.className} antialiased`}>
        <NuqsAdapter>
          <SessionProvider>{children}</SessionProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
