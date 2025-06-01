"use server";

import { auth } from "@/auth";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "";

export const fetchBodTableData = async ({
  companyId,
  sortParam,
  sortMetric,
  table,
}: {
  companyId: string;
  sortParam: string;
  sortMetric: string;
  table: string;
}) => {
  const session = await auth();
  const searchParams = new URLSearchParams();

  if (table == "bod") {
    searchParams.set("sorted_by", sortParam);
    searchParams.set("sort_order", sortMetric);
  }

  const params = searchParams.toString() ? `?${searchParams.toString()}` : "";

  if (session?.user?.accessToken) {
    try {
      const res = await fetch(
        `${baseUrl}/relations/${companyId}/personnel${params}`,
        {
          next: { revalidate: 3600 },
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();

      return data;
    } catch (err) {
      console.error(err);
      throw new Error("failed to fetch data");
    }
  }
};

export const fetchExexTableData = async ({
  companyId,
  sortParam,
  sortMetric,
  table,
}: {
  companyId: string;
  sortParam: string;
  sortMetric: string;
  table: string;
}) => {
  const session = await auth();
  const searchParams = new URLSearchParams();

  if (table === "exec") {
    searchParams.set("sorted_by", sortParam);
    searchParams.set("sort_order", sortMetric);
  }

  const params = searchParams.toString() ? `?${searchParams.toString()}` : "";

  if (session?.user?.accessToken) {
    try {
      const res = await fetch(
        `${baseUrl}/relations/${companyId}/executives${params}`,
        {
          next: { revalidate: 3600 },
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();

      return data;
    } catch (err) {
      console.error(err);
      throw new Error("failed to fetch data");
    }
  }
};

export const fetchInfo = async ({ companyId }: { companyId: string }) => {
  const session = await auth();
  if (session?.user?.accessToken) {
    try {
      const res = await fetch(`${baseUrl}/relations/${companyId}/information`, {
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
