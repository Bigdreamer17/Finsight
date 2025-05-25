import CashFlow from "@/app/ui/dashboard/company/financials/cash-flow-statement";
import ErrorFallback from "@/app/ui/dashboard/company/financials/cash-flow-statement/CashFlowErrorFallback";
import CashFlowSkeleton from "@/app/ui/dashboard/company/financials/cash-flow-statement/CashFlowSkeleton";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const CashFlowStatementPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <Suspense fallback={<CashFlowSkeleton />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <CashFlow companyId={companyId} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default CashFlowStatementPage;
