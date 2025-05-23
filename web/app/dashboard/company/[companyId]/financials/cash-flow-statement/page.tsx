import CashFlow from "@/app/ui/dashboard/company/financials/cash-flow-statement";
import CashFlowSkeleton from "@/app/ui/dashboard/company/financials/cash-flow-statement/CashFlowSkeleton";
import { Suspense } from "react";

const CashFlowStatementPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <Suspense fallback={<CashFlowSkeleton />}>
      <CashFlow companyId={companyId} />
    </Suspense>
  );
};

export default CashFlowStatementPage;
