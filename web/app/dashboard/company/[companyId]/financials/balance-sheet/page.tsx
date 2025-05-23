import BalanceSheet from "@/app/ui/dashboard/company/financials/balance-sheet";
import BalanceSheetSkeleton from "@/app/ui/dashboard/company/financials/balance-sheet/BalanceSheetSkeleton";
import { Suspense } from "react";

const BalanceSheetsPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <Suspense fallback={<BalanceSheetSkeleton />}>
      <BalanceSheet companyId={companyId} />
    </Suspense>
  );
};

export default BalanceSheetsPage;
