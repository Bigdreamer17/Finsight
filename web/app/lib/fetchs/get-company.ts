"use server";

import { auth } from "@/auth";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "";

export const fetchCompanyById = async ({
  companyId,
}: {
  companyId: string;
}) => {
  const session = await auth();

  if (session?.user?.accessToken) {
    try {
      const res = await fetch(`${baseUrl}/companies/${companyId}`, {
        next: { revalidate: 3600 },
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      return data;
    } catch (err) {
      console.error(err);
      throw new Error("failed to fetch data");
    }
  }
};

export const fetchCompanies = async () => {
  const session = await auth();

  if (session?.user?.accessToken) {
    try {
      const res = await fetch(`${baseUrl}/companies`, {
        next: { revalidate: 3600 },
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      return data;
    } catch (err) {
      console.error(err);
      throw new Error("failed to fetch data");
    }
  }
};
