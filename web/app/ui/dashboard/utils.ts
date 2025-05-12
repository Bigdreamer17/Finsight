import type { companyDashboard, metricType } from "./types";

export const getDashbaordTableData = (
  company: companyDashboard,
): { [key: string]: string } => {
  return {
    companyName: company.companyName,
    sector: company.sector ?? "-",
    companyWorth: company.companyWorth
      ? `${getTruncatedMoney(company.companyWorth)} Birr`
      : "-",
    dividendPerShare: company.dividendPerShare
      ? `${getTruncatedMoney(company.dividendPerShare)} Birr`
      : "-",
    financialHealth: company.financialHealth ?? "-",
    investmentPotential: company.investmentPotential ?? "-",
    investementRanking: company.investementRanking
      ? getRanking(company.investementRanking, "investment potential")
      : "-",
    revenueLastYear: company.revenueLastYear
      ? `${getTruncatedMoney(company.revenueLastYear)} Birr`
      : "-",
    netProfitMargin: company.netProfitMargin
      ? `${company.netProfitMargin}%`
      : "-",
    roa: company.roa ? `${company.roa}%` : "-",
    roe: company.roe ? `${company.roe}%` : "-",
    profitability: company.profitability ?? "-",
    profitabilityRanking: company.profitabilityRanking
      ? getRanking(company.profitabilityRanking, "profitability")
      : "-",
    revenueGrowthRate: company.revenueGrowthRate
      ? `${company.revenueGrowthRate}%`
      : "-",
    growth: company.growth ?? "-",
    growthRanking: company.growthRanking
      ? getRanking(company.growthRanking, "growth")
      : "-",
    growthRating: company.growthRating ?? "-",
    debtToEquity: company.debtToEquity ? `${company.debtToEquity}%` : "-",
    riskLevel: company.riskLevel ?? "-",
    stabilityRanking: company.stabilityRanking
      ? getRanking(company.stabilityRanking, "growth")
      : "-",
    stabilityRating: company.stabilityRating ?? "-",
    dividendYeild: company.dividendYeild ? `${company.dividendYeild}%` : "-",
    totalNumberOfShares: String(company.totalNumberOfShares ?? "-"),
    dividendStrength: company.dividendStrength ?? "-",
  };
};

export const checkIsActiveMetric = (
  metricName: string,
  metrics: metricType[],
): boolean => {
  for (const metric of metrics) {
    if (metric.name === metricName) {
      return true;
    }
  }

  return false;
};

export const getTruncatedMoney = (money: number): string => {
  if (money >= 1_000_000_000) {
    return `${(money / 1_000_000_000).toFixed(2)}B`;
  } else if (money >= 1_000_000) {
    return `${(money / 1_000_000).toFixed(2)}M`;
  } else {
    return money.toLocaleString();
  }
};

export const getRanking = (percentage: number, sector: string) => {
  return `Top ${percentage}% in ${sector}`;
};

export const sortTableData = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableData: any,
  sortParam: string,
  sortMetric: string,
) => {
  return [...tableData].sort((a, b) => {
    const valA = a[sortParam]?.toString().toLowerCase() ?? "";
    const valB = b[sortParam]?.toString().toLowerCase() ?? "";

    return sortMetric === "Asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });
};
