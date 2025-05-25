import KeyMetrics from "@/app/ui/dashboard/company/key-metrics";
import KeyMetricsSkeleton from "@/app/ui/dashboard/company/key-metrics/KeyMetricsSkeleton";
import ErrorFallback from "@/app/ui/dashboard/company/overview/CompanyOverviewErrorFallback";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const KeyMetricsPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <Suspense fallback={<KeyMetricsSkeleton />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <KeyMetrics companyId={companyId} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default KeyMetricsPage;
