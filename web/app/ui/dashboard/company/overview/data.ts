import type { chartMetricsType, chartsMapType } from "./types";

export const chartsData: chartMetricsType[] = [
  { name: "revenue", toolTipTitle: "Birr in revenue" },
  { name: "net_profit", toolTipTitle: "Birr of net profit" },
  { name: "eps", toolTipTitle: "Birr" },
];

export const chartsMap: chartsMapType = {
  revenue: "Revenue Growth",
  net_profit: "Net Profit Growth",
  eps: "EPS Growth",
};
