import { fetchBalanceSheet } from "@/app/lib/fetchs/get-financials";
import SearchMetric from "./SearchMetric";
import type { financialsProps } from "../types";
import BalanceSheetTable from "./BalanceSheetTable";
import type { balanceSheetType } from "./types";

const BalanceSheet = async ({ companyId }: financialsProps) => {
  const balanceSheet: balanceSheetType = await fetchBalanceSheet({
    companyId,
  });

  return (
    <div className="flex flex-col gap-2">
      <SearchMetric />

      <BalanceSheetTable
        tableData={balanceSheet.reports || []}
        minYear={balanceSheet.min_fiscal_year}
      />
    </div>
  );
};

export default BalanceSheet;
