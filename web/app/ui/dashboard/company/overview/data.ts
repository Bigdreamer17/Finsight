import type { chartMetricsType, chartsMapType } from "./types";

export const chartsData: chartMetricsType[] = [
  { name: "revenue", toolTipTitle: "birr in revenue" },
  { name: "net_profit", toolTipTitle: "birr of net profit" },
  { name: "eps", toolTipTitle: "" },
];

export const chartsMap: chartsMapType = {
  revenue: "Revenue Growth",
  net_profit: "Net Profit Growth",
  eps: "EPS Growth",
  assets: "Assets",
  equity: "Equity",
};
