import { fetchBalanceSheet } from "@/app/lib/fetchs/get-financials";
import SearchMetric from "./SearchMetric";
import type { financialsProps } from "../types";
import BalanceSheetTable from "./BalanceSheetTable";
import type { balanceSheetType } from "./types";
import BalanceGraph from "./BalanceGraph";

const BalanceSheet = async ({ companyId }: financialsProps) => {
  const balanceSheet: balanceSheetType = await fetchBalanceSheet({
    companyId,
  });

  const sortedBalanceSheet = balanceSheet.reports.sort((a, b) => {
    const yearA = Number(a.fiscal_year ?? 0);
    const yearB = Number(b.fiscal_year ?? 0);
    return yearA - yearB;
  });

  return (
    <div className="flex flex-col gap-5">
      <BalanceGraph tableData={sortedBalanceSheet || []} />

      <div className="flex flex-col gap-2">
        <SearchMetric />

        <BalanceSheetTable
          tableData={sortedBalanceSheet.toReversed() || []}
          minYear={balanceSheet.min_fiscal_year}
        />
      </div>
    </div>
  );
};

export default BalanceSheet;
