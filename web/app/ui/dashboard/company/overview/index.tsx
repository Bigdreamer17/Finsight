import { fetchCompanyById } from "@/app/lib/fetchs/get-company";
import type { companyIdType, companyType } from "../common/types";
import CompanyBreakDown from "./CompanyBreakDown";
import CompanyChart from "./CompanyChart";
import { getBreakDownProps } from "./utils";
import { fetchCompanyOverviewCharts } from "@/app/lib/fetchs/get-charts";
import { overviewChartType } from "./types";

const CompanyOverview = async ({ companyId }: companyIdType) => {
  const [companyOverviewData, chartsData]: [companyType, overviewChartType] =
    await Promise.all([
      fetchCompanyById({ companyId }),
      fetchCompanyOverviewCharts({ companyId }),
    ]);

  const company = {
    name: companyOverviewData.name,
    stockName: companyOverviewData.stock_name,
    stockPrice: companyOverviewData.stock_price,
    description: companyOverviewData.description,
    ceo: companyOverviewData.ceo,
    website: companyOverviewData.website,
    sector: companyOverviewData.sector,
    foundationYear: companyOverviewData.year_founded,
    profile: {
      marketCap: 2940000000,
      ev: 2920000000,
      shares: 740000000,
      revenue: 26180000,
      employees: 228000,
    },
    valuation: {
      pe: 31.8,
      pb: 9.7,
      // evSales: 11.2,
      evEbitda: 20.6,
      pfcf: 42.0,
      evGrossProfit: 16.1,
    },
    growth: {
      revThree: 12.3,
      revFive: 4.3,
      revTen: 10.9,
      deThree: 9.7,
      deFive: 16.7,
      // deTen: 17.5,
      revFwdTwo: 13.2,
    },
    margins: {
      gross: 69.4,
      // ebitda: 54.3,
      operating: 45.0,
      preTax: 43.4,
      net: 35.4,
      fcf: 26.7,
    },
    returns: {
      roa: 19.8,
      // rota: 44.8,
      roe: 41.9,
      roce: 31.0,
      roic: 28.0,
    },
    dividends: {
      divYield: 0.8,
      payout: 25.3,
      dps: 3.0,
      dpsThree: 10.2,
      dpsFive: 10.2,
    },
  };

  const breakDownProps = getBreakDownProps(company);

  return (
    <div className="flex px-4 pb-4 flex-col gap-3 xl:flex-row items-stretch mt-2.5">
      <CompanyBreakDown {...breakDownProps} />
      <CompanyChart chartData={chartsData} />
    </div>
  );
};

export default CompanyOverview;
