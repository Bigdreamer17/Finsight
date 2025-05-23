"use server";

import { auth } from "@/auth";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "";

export const fetchIncomeStatement = async ({
  companyId,
}: {
  companyId: string;
}) => {
  const session = await auth();

  if (session?.user?.accessToken) {
    try {
      const res = await fetch(
        `${baseUrl}/companies/${companyId}/income-statements`,
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

export const fetchBalanceSheet = async ({
  companyId,
}: {
  companyId: string;
}) => {
  const session = await auth();

  if (session?.user?.accessToken) {
    try {
      const res = await fetch(
        `${baseUrl}/companies/${companyId}/balance-sheets`,
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

export const fetchCashFlowStatement = async ({
  companyId,
}: {
  companyId: string;
}) => {
  const session = await auth();

  if (session?.user?.accessToken) {
    try {
      const res = await fetch(`${baseUrl}/companies/${companyId}/cash-flow`, {
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

export const fetchKpis = async ({ companyId }: { companyId: string }) => {
  const session = await auth();

  if (session?.user?.accessToken) {
    try {
      const res = await fetch(`${baseUrl}/companies/${companyId}/kpis`, {
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
