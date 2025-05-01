import CompanyDetail from "@/app/ui/dashboard/company/common/CompanyDetail";
import CompanyNavigation from "@/app/ui/dashboard/company/common/CompanyNavigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FinSight | Dashboard",
  description: "Dashboard for FinSight",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { companyId: string };
}>) {
  const { companyId } = params;

  return (
    <div className="bg-[#1C1C21] text-white">
      <CompanyDetail companyId={companyId} />

      <CompanyNavigation />

      {children}
    </div>
  );
}
