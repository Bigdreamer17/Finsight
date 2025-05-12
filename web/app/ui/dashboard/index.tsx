import SearchCompany from "./SearchCompany";
import SearchMetric from "./SearchMetric";
import Table from "./Table";
import type { dashboardProps } from "./types";

const Dashboard = ({ company, metric, companyFilter }: dashboardProps) => {
  interface comp {
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
  }
  const companies: comp[] = [
    {
      companyName: "Wegagen bank",
      sector: "Financial",
      companyWorth: 32000000,
      financialHealth: "Very strong buy(A)",
      dividendPerShare: 1000,
      investementRanking: 35,
      revenueLastYear: 30000000,
      growth: "High growth",
      growthRanking: 20,
      growthRating: "Above industry average",
      investmentPotential: "High investement potential",
      profitability: "Strong profitablility",
      profitabilityRanking: 15,
      revenueGrowthRate: 35,
      roa: 32,
      roe: 15,
      riskLevel: "Low risk investement",
      stabilityRating: "Above industry average",
      dividendStrength: "High dividends",
      debtToEquity: 69,
      dividendYeild: 8,
      totalNumberOfShares: 54361,
    },
    {
      companyName: "Birhan bank",
      sector: "Financial",
      companyWorth: 88020000,
      financialHealth: "Very strong buy(A)",
      dividendPerShare: 500,
      investementRanking: 25,
      revenueLastYear: 50000000,
      growth: "High growth",
      growthRanking: 22,
      growthRating: "Above industry average",
      investmentPotential: "Moderate investement potential",
      profitability: "Strong profitablility",
      profitabilityRanking: 19,
      revenueGrowthRate: 25,
      roa: 30,
      roe: 29,
      riskLevel: "Moderate risk investement",
      stabilityRating: "Above industry average",
      dividendStrength: "High dividends",
      netProfitMargin: 23,
      debtToEquity: 29,
    },
  ];

  return (
    <div className="rounded-lg flex-1 bg-[#2C2C35] p-4 flex flex-col gap-2.5">
      <div className="flex flex-wrap gap-4 items-center">
        <SearchMetric />

        <SearchCompany />
      </div>

      <Table comp={companies} />
    </div>
  );
};

export default Dashboard;
