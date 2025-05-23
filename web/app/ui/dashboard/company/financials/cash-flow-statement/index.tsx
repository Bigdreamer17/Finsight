import { fetchCashFlowStatement } from "@/app/lib/fetchs/get-financials";
import SearchMetric from "./SearchMetric";
import type { financialsProps } from "../types";
import CashFlowTable from "./CashFlowTable";
import type { cashFlowType } from "./types";

const CashFlow = async ({ companyId }: financialsProps) => {
  const cashFlowStatement: cashFlowType = await fetchCashFlowStatement({
    companyId,
  });

  return (
    <div className="flex flex-col gap-2">
      <SearchMetric />

      <CashFlowTable
        tableData={cashFlowStatement.reports || []}
        minYear={cashFlowStatement.min_fiscal_year}
      />
    </div>
  );
};

export default CashFlow;
