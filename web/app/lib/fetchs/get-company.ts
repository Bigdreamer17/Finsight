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
};

export const fetchCompaniesDashboard = async ({
  sortParam,
  sortMetric,
}: {
  sortParam: string;
  sortMetric: string;
}) => {
  const session = await auth();
  const searchParams = new URLSearchParams();
  searchParams.set("sort_by", sortParam);
  searchParams.set("order", sortMetric);

  const params = searchParams.toString() ? `?${searchParams.toString()}` : "";

  if (session?.user?.accessToken) {
    try {
      const res = await fetch(`${baseUrl}/dashboard/metrics${params}`, {
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
