import IncomeStatement from "@/app/ui/dashboard/company/financials/income-statement";
import IncomeStatementSkeleton from "@/app/ui/dashboard/company/financials/income-statement/IncomeStatementSkeleton";
import { Suspense } from "react";

const FinancialsPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <Suspense fallback={<IncomeStatementSkeleton />}>
      <IncomeStatement companyId={companyId} />
    </Suspense>
  );
};

export default FinancialsPage;
