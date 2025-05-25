import BalanceSheet from "@/app/ui/dashboard/company/financials/balance-sheet";
import ErrorFallback from "@/app/ui/dashboard/company/financials/balance-sheet/BalanceSheetErrorFallback";
import BalanceSheetSkeleton from "@/app/ui/dashboard/company/financials/balance-sheet/BalanceSheetSkeleton";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const BalanceSheetsPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <Suspense fallback={<BalanceSheetSkeleton />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BalanceSheet companyId={companyId} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default BalanceSheetsPage;
