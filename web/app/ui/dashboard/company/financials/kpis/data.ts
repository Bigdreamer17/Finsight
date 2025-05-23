import { metricType } from "../../../types";

export const kpisMetrics: metricType[] = [
  { name: "asset_turnover" },
  { name: "basic_eps" },
  { name: "leverage_ratio" },
  { name: "profit_margin" },
  { name: "roa" },
  { name: "roe" },
];

export const fieldsMap: { [key: string]: string } = {
  asset_turnover: "Asset Turnover",
  basic_eps: "Basic EPS",
  leverage_ratio: "Leverage Ratio",
  profit_margin: "Profit Margin",
  roa: "ROA",
  roe: "ROE",
};
