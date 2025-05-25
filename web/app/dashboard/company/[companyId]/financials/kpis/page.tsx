import Kpis from "@/app/ui/dashboard/company/financials/kpis";
import ErrorFallback from "@/app/ui/dashboard/company/financials/kpis/KpisErrorFallback";
import KpisSkeleton from "@/app/ui/dashboard/company/financials/kpis/KpisSkeleton";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const KpisPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <Suspense fallback={<KpisSkeleton />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Kpis companyId={companyId} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default KpisPage;
