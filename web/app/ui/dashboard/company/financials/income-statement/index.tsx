import { fetchIncomeStatement } from "@/app/lib/fetchs/get-financials";
import IncomeStatementTable from "./IncomeStatementTable";
import SearchMetric from "./SearchMetric";
import type { financialsProps, financialsType } from "../types";
import IncomeGraph from "./IncomeGraph";

const IncomeStatement = async ({ companyId }: financialsProps) => {
  const incomeStatement: financialsType[] = await fetchIncomeStatement({
    companyId,
  });

  const sortedIncomeStatement = incomeStatement.sort((a, b) => {
    const yearA = Number(a.fiscal_year ?? 0);
    const yearB = Number(b.fiscal_year ?? 0);
    return yearA - yearB;
  });

  return (
    <div className="flex flex-col gap-5">
      <IncomeGraph tableData={sortedIncomeStatement || []} />

      <div className="flex flex-col gap-2">
        <SearchMetric />

        <IncomeStatementTable
          tableData={sortedIncomeStatement.toReversed() || []}
        />
      </div>
    </div>
  );
};

export default IncomeStatement;
