"use server";

import { auth } from "@/auth";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "";

export const fetchPerformanceIndicators = async ({
  companyId,
}: {
  companyId: string;
}) => {
  const session = await auth();

  if (session?.user?.accessToken) {
    try {
      const res = await fetch(
        `${baseUrl}/companies/${companyId}/performance-indicators`,
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

export const fetchCapitalStructure = async ({
  companyId,
}: {
  companyId: string;
}) => {
  const session = await auth();

  if (session?.user?.accessToken) {
    try {
      const res = await fetch(
        `${baseUrl}/companies/${companyId}/capital-structure`,
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

export const fetchInvestmentSummary = async ({
  companyId,
}: {
  companyId: string;
}) => {
  const session = await auth();

  if (session?.user?.accessToken) {
    try {
      const res = await fetch(
        `${baseUrl}/companies/${companyId}/investment-summary`,
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

export const fetchROICalculatorMetrics = async ({
  companyId,
}: {
  companyId: string;
}) => {
  const session = await auth();

  if (session?.user?.accessToken) {
    try {
      const res = await fetch(`${baseUrl}/companies/${companyId}/roi-metrics`, {
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

export const fetchInvestorScores = async ({
  companyId,
}: {
  companyId: string;
}) => {
  const session = await auth();

  if (session?.user?.accessToken) {
    try {
      const res = await fetch(
        `${baseUrl}/companies/${companyId}/investor-scores`,
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
