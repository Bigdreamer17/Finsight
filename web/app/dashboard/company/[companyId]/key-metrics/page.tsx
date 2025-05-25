import KeyMetrics from "@/app/ui/dashboard/company/key-metrics";
import KeyMetricsSkeleton from "@/app/ui/dashboard/company/key-metrics/KeyMetricsSkeleton";
import { Suspense } from "react";

const KeyMetricsPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <Suspense fallback={<KeyMetricsSkeleton />}>
      <KeyMetrics companyId={companyId} />
    </Suspense>
  );
};

export default KeyMetricsPage;
