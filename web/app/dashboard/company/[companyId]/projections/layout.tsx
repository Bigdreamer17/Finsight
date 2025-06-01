import ProjectionsNavigation from "@/app/ui/dashboard/company/projections/ProjectionsNavigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FinSight | Forecast",
  description: "Forecast for FinSight",
};

export default async function FinancialLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="rounded-lg grow bg-[#2C2C35] p-4 flex flex-col gap-2.5 mt-5">
      <ProjectionsNavigation />

      {children}
    </div>
  );
}
