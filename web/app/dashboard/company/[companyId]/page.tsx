import CompanyOverview from "@/app/ui/dashboard/company/overview";
import CompanyOverviewSkeleton from "@/app/ui/dashboard/company/overview/CompanyOverviewSkeleton";
import { Suspense } from "react";

const OverviewPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <Suspense fallback={<CompanyOverviewSkeleton />}>
      <CompanyOverview companyId={companyId} />
    </Suspense>
  );
};

export default OverviewPage;
