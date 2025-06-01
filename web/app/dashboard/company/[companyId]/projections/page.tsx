import Projections from "@/app/ui/dashboard/company/projections";
import ErrorFallback from "@/app/ui/dashboard/company/projections/ErrorFallback";
import ProjectionsSkeleton from "@/app/ui/dashboard/company/projections/ProjectionsSkeleton";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const FinancialsPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <Suspense fallback={<ProjectionsSkeleton />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Projections companyId={companyId} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default FinancialsPage;
