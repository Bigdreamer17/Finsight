import ChatBot from "@/app/ui/dashboard/ChatBot";
import CompanyDetail from "@/app/ui/dashboard/company/common/CompanyDetail";
import CompanyDetailErrorFallback from "@/app/ui/dashboard/company/common/CompanyDetailErrorFallback";
import CompanyDetailSkeleton from "@/app/ui/dashboard/company/common/CompanyDetailSkeleton";
import CompanyNavigation from "@/app/ui/dashboard/company/common/CompanyNavigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RiChatAiLine } from "react-icons/ri";

export const metadata: Metadata = {
  title: "FinSight | Analysis",
  description: "Dashboard for FinSight",
};

export default async function AnalyticsLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ companyId: string }>;
}>) {
  const { companyId } = await params;

  return (
    <div className="bg-[#1C1C21] relative text-white flex flex-col grow">
      <Suspense fallback={<CompanyDetailSkeleton />}>
        <ErrorBoundary FallbackComponent={CompanyDetailErrorFallback}>
          <CompanyDetail companyId={companyId} />
        </ErrorBoundary>
      </Suspense>

      <CompanyNavigation companyId={companyId} />

      {children}

      <Suspense
        fallback={
          <div className="fixed bottom-7 right-7 z-50 grid place-items-center">
            <button
              className="p-3 rounded-full bg-[#27AA43] hover:cursor-pointer focus:outline-none"
              disabled
            >
              <RiChatAiLine size={32} />
            </button>
          </div>
        }
      >
        <ChatBot companyId={companyId} />
      </Suspense>
    </div>
  );
}
