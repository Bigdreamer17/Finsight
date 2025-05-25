import type { chartType, pieDataType } from "../../common/types";

export type chartProps = {
  chartName: string;
  toolTipTitle: string;
  data: chartType[];
};

export type performanceIndicatorsProps = {
  performanceIndicators?: performanceIndicatorsType;
};

export type debtToEquityRationProps = {
  data: pieDataType[];
};

export type capitalStructureType = {
  equity: number;
  debt: number;
};

export type performanceIndicatorsType = {
  roa: number;
  roe: number;
  debt_to_equity: number;
  profitability: string;
  risk: string;
};

export type investmentSummaryType = {
  investment_potential: string;
  reason: string;
  criteria: {
    roe: number;
    eps_growth_consistent: boolean;
    debt_to_equity: number;
  };
};

export type roiCalculatorMetricsType = {
  average_revenue_growth: number;
  average_profit_growth: number;
  average_eps_growth: number;
};

export type ROICalculatorProps = {
  averageRevenueGrowth: number;
  averageProfitGrowth: number;
  averageEPSGrowth: number;
};
