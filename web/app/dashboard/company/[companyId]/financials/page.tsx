import IncomeStatement from "@/app/ui/dashboard/company/financials/income-statement";
import ErrorFallback from "@/app/ui/dashboard/company/financials/income-statement/IncomeStatementErrorFallback";
import IncomeStatementSkeleton from "@/app/ui/dashboard/company/financials/income-statement/IncomeStatementSkeleton";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const FinancialsPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <Suspense fallback={<IncomeStatementSkeleton />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <IncomeStatement companyId={companyId} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default FinancialsPage;
