import FinancialsNavigation from "@/app/ui/dashboard/company/financials/common/FinancialsNavigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FinSight | Financials",
  description: "Dashboard for FinSight",
};

export default function FinancialLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { companyId: string };
}>) {
  const { companyId } = params;

  return (
    <div className="rounded-lg grow bg-[#2C2C35] p-4 flex flex-col gap-2.5 mt-5">
      <FinancialsNavigation companyId={companyId} />

      {children}
    </div>
  );
}
