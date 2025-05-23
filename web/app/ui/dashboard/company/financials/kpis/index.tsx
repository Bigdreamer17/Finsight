import { fetchKpis } from "@/app/lib/fetchs/get-financials";
import SearchMetric from "./SearchMetric";
import type { financialsProps, financialsType } from "../types";
import KpisTable from "./KpisTable";

const Kpis = async ({ companyId }: financialsProps) => {
  const kpis: financialsType[] = await fetchKpis({
    companyId,
  });

  const formattedKpis: financialsType[] = kpis.map((k) => ({
    fiscal_year: k["fiscal_year"],
    roa: `${k["roa"] && ((k["roa"] as number) * 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%`,
    roe: `${k["roe"] && ((k["roe"] as number) * 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%`,
    profit_margin: `${k["profit_margin"] && ((k["profit_margin"] as number) * 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%`,
    asset_turnover:
      k["asset_turnover"] &&
      (k["asset_turnover"] as number).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }),
    leverage_ratio: `${k["leverage_ratio"] && (k["leverage_ratio"] as number).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}x`,
    basic_eps: k["basic_eps"],
  }));
  return (
    <div className="flex flex-col gap-2">
      <SearchMetric />

      <KpisTable tableData={formattedKpis || []} />
    </div>
  );
};

export default Kpis;
