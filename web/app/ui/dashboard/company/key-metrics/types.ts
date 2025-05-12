import type { dataType, pieDataType } from "../../common/types";

export type chartProps = {
  chartName: string;
  toolTipTitle: string;
  data: dataType[];
};

export type performanceIndicatorsType = {
  roa?: number;
  roe?: number;
  buyersProfitablity?: string;
  riskLevel?: string;
  debtToEquity?: number;
};

export type performanceIndicatorsProps = {
  performanceIndicators?: performanceIndicatorsType;
};

export type debtToEquityRationProps = {
  data: pieDataType[];
};
