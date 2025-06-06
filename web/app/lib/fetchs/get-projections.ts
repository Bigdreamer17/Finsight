"use server";

import { auth } from "@/auth";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "";

export const fetchCompanyProjections = async ({
  companyId,
}: {
  companyId: string;
}) => {
  const session = await auth();

  if (session?.user?.accessToken) {
    try {
      const res = await fetch(`${baseUrl}/companies/${companyId}/forecast`, {
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
