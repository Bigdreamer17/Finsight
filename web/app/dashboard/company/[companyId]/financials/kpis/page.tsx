import Kpis from "@/app/ui/dashboard/company/financials/kpis";
import KpisSkeleton from "@/app/ui/dashboard/company/financials/kpis/KpisSkeleton";
import { Suspense } from "react";

const KpisPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <Suspense fallback={<KpisSkeleton />}>
      <Kpis companyId={companyId} />
    </Suspense>
  );
};

export default KpisPage;
