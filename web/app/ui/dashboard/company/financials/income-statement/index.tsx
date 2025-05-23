import { fetchIncomeStatement } from "@/app/lib/fetchs/get-financials";
import IncomeStatementTable from "./IncomeStatementTable";
import SearchMetric from "./SearchMetric";
import type { financialsProps, financialsType } from "../types";

const IncomeStatement = async ({ companyId }: financialsProps) => {
  const incomeStatement: financialsType[] = await fetchIncomeStatement({
    companyId,
  });

  return (
    <div className="flex flex-col gap-2">
      <SearchMetric />
      <IncomeStatementTable tableData={incomeStatement || []} />
    </div>
  );
};

export default IncomeStatement;
