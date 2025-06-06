export const dashboardMetrics = [
  { name: "Company name", isPaidFeature: false },
  { name: "Sector", isPaidFeature: false },
  { name: "Company worth", isPaidFeature: false },
  { name: "Financial health badge", isPaidFeature: false },
  { name: "Dividend per share", isPaidFeature: false },
  { name: "Investment potential badge", isPaidFeature: true },
  { name: "Investment ranking", isPaidFeature: true },
  { name: "Revenue last year", isPaidFeature: false },
  { name: "Net profit margin", isPaidFeature: false },
  { name: "ROE", isPaidFeature: false },
  { name: "ROA", isPaidFeature: false },
  { name: "Profitability badge", isPaidFeature: false },
  { name: "Profitability ranking", isPaidFeature: true },
  { name: "Revenue growth rate(5yr)", isPaidFeature: false },
  { name: "Growth badge", isPaidFeature: true },
  { name: "Growth ranking", isPaidFeature: false },
  { name: "Growth rating", isPaidFeature: true },
  { name: "Debt-to-equity ratio", isPaidFeature: false },
  { name: "Risk badge", isPaidFeature: false },
  { name: "Stability ranking", isPaidFeature: false },
  { name: "Stability rating", isPaidFeature: false },
  { name: "Dividend yeild", isPaidFeature: true },
  { name: "Total number of shares", isPaidFeature: false },
  { name: "Dividend strength badge", isPaidFeature: false },
];

export const metricMap: { [key: string]: string } = {
  "Company name": "companyName",
  Sector: "sector",
  "Company worth": "companyWorth",
  "Financial health badge": "financialHealth",
  "Dividend per share": "dividendPerShare",
  "Investment potential badge": "investmentPotential",
  "Investment ranking": "investementRanking",
  "Revenue last year": "revenueLastYear",
  "Net profit margin": "netProfitMargin",
  ROE: "roe",
  ROA: "roa",
  "Profitability badge": "profitabilility",
  "Profitability ranking": "profitabilityRanking",
  "Revenue growth rate(5yr)": "revenueGrowthRate",
  "Growth badge": "growth",
  "Growth ranking": "growthRanking",
  "Growth rating": "growthRating",
  "Debt-to-equity ratio": "debtToEquity",
  "Risk badge": "riskLevel",
  "Stability ranking": "stabilityRanking",
  "Stability rating": "stabilityRating",
  "Dividend yeild": "dividendYeild",
  "Total number of shares": "totalNumberOfShares",
  "Dividend strength badge": "dividendStrength",
};

export const metrics = [
  {
    name: "Company Name",
  },
  {
    name: "Sector",
    isNotSort: true,
  },
  {
    name: "EPS",
  },
  {
    name: "ROE",
  },
  {
    name: "Debt-to-equity Ratio",
  },
  {
    name: "Profit Margin",
  },
];

export const map: { [key: string]: string } = {
  "Company Name": "name",
  Sector: "sector",
  EPS: "eps",
  ROE: "roe",
  "Debt-to-equity Ratio": "debt_to_equity",
  "Profit Margin": "profit_margin",
};
