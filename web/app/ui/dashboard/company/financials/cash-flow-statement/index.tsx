import { fetchCashFlowStatement } from "@/app/lib/fetchs/get-financials";
import SearchMetric from "./SearchMetric";
import type { financialsProps } from "../types";
import CashFlowTable from "./CashFlowTable";
import type { cashFlowType } from "./types";
import CashGraph from "./CashGraph";

const CashFlow = async ({ companyId }: financialsProps) => {
  const cashFlowStatement: cashFlowType = await fetchCashFlowStatement({
    companyId,
  });

  const sortedCashFlowStatement = cashFlowStatement.reports.sort((a, b) => {
    const yearA = Number(a.fiscal_year ?? 0);
    const yearB = Number(b.fiscal_year ?? 0);
    return yearA - yearB;
  });

  return (
    <div className="flex flex-col gap-5">
      <CashGraph tableData={sortedCashFlowStatement || []} />

      <div className="flex flex-col gap-2">
        <SearchMetric />

        <CashFlowTable
          tableData={sortedCashFlowStatement.toReversed() || []}
          minYear={cashFlowStatement.min_fiscal_year}
        />
      </div>
    </div>
  );
};

export default CashFlow;
