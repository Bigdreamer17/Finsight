export type dashboardProps = {
  company: string;
  metric: string;
  companyFilter: string;
};

export type searchProps = {
  paginationQuery?: string;
};

export type metricType = {
  name: string;
  isPaidFeature: boolean;
};

export type companyDashboard = {
  companyName: string;
  sector?: string;
  companyWorth?: number;
  dividendPerShare?: number;
  financialHealth?: string;
  growth?: string;
  growthRanking?: number;
  growthRating?: string;
  investmentPotential?: string;
  investementRanking?: number;
  revenueLastYear?: number;
  roa?: number;
  roe?: number;
  riskLevel?: string;
  netProfitMargin?: number;
  profitability?: string;
  profitabilityRanking?: number;
  revenueGrowthRate?: number;
  stabilityRanking?: number;
  stabilityRating?: string;
  dividendYeild?: number;
  totalNumberOfShares?: number;
  dividendStrength?: string;
  debtToEquity?: number;
};

export type TableProps = {
  comp: companyDashboard[];
};
