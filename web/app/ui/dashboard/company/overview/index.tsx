import { fetchCompanyById } from "@/app/lib/fetchs/get-company";
import type { companyIdType, companyType } from "../common/types";
import CompanyBreakDown from "./CompanyBreakDown";
import CompanyChart from "./CompanyChart";
import { getBreakDownProps } from "./utils";

const CompanyOverview = async ({ companyId }: companyIdType) => {
  const [companyFetch]: [companyType] = await Promise.all([
    fetchCompanyById({ companyId }),
    // add other fetches here later
  ]);
  interface comp {
    name?: string;
    stockName?: string;
    stockPrice?: string;
    description?: string;
    ceo?: string;
    website?: string;
    sector?: string;
    foundationYear?: string;
    profile?: {
      marketCap?: number;
      ev?: number;
      shares?: number;
      revenue?: number;
      employees?: number;
    };
    valuation?: {
      pe?: number;
      pb?: number;
      evSales?: number;
      evEbitda?: number;
      pfcf?: number;
      evGrossProfit?: number;
    };
    growth?: {
      revThree?: number;
      revFive?: number;
      revTen?: number;
      deThree?: number;
      deFive?: number;
      deTen?: number;
      revFwdTwo?: number;
    };
    margins?: {
      gross?: number;
      ebitda?: number;
      operating?: number;
      preTax?: number;
      net?: number;
      fcf?: number;
    };
    returns?: {
      roa?: number;
      rota?: number;
      roe?: number;
      roce?: number;
      roic?: number;
    };
    dividends?: {
      divYield?: number;
      payout?: number;
      dps?: number;
      dpsThree?: number;
      dpsFive?: number;
    };
  }
  const companyDet: { [key: string]: comp } = {
    "2d12ea5a-dce7-4722-8014-bf596514cbe7": {
      name: companyFetch.name,
      stockName: companyFetch.stock_name,
      stockPrice: companyFetch.stock_price,
      description: companyFetch.description,
      ceo: companyFetch.ceo,
      website: companyFetch.website,
      sector: companyFetch.sector,
      foundationYear: companyFetch.year_founded,
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
    },
  };

  const company = companyDet[companyId];

  const breakDownProps = getBreakDownProps(company);

  return (
    <div className="flex px-4 flex-col gap-3 xl:flex-row items-stretch mt-5">
      <CompanyBreakDown {...breakDownProps} />
      <CompanyChart />
    </div>
  );
};

export default CompanyOverview;
