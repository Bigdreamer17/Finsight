import type { companyIdType } from "../common/types";
import CompanyBreakDown from "./CompanyBreakDown";
import CompanyChart from "./CompanyChart";
import { getBreakDownProps } from "./utils";

const CompanyOverview = async ({ companyId }: companyIdType) => {
  interface comp {
    name: string;
    stockName: string;
    stockPrice: number;
    description?: string;
    ceo?: string;
    website?: string;
    sector?: string;
    foundationYear?: number;
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
    "123": {
      name: "Microsoft Corporation",
      stockName: "NasdaqGS-MSFT",
      stockPrice: 391.16,
      description: `
Dashen Bank, established in 1995 and headquartered in Addis Ababa, is one of Ethiopia’s leading private commercial banks, offering a wide range of retail, commercial, and digital banking services across the country. Operating over 900 branches and thousands of ATMs and POS terminals, the bank provides products including loans, savings, trade finance, and Sharia-compliant services under its "Sharik" brand. Dashen is also a pioneer in digital innovation, having launched Ethiopia’s first banking Super App, Amole, which offers mobile payments, transfers, e-commerce, and utility services. Internationally, the bank maintains partnerships with major global financial networks such as VISA, MasterCard, AMEX, and UnionPay, and supports remittance through operators like Western Union and MoneyGram. With over ETB 183.7 billion in total assets and a profit of ETB 6.6 billion in the 2023/24 fiscal year, Dashen Bank continues to drive financial inclusion and technological advancement in Ethiopia’s banking sector.
`,
      ceo: "Mr. Satya Nadella",
      website: "www.microsoft.com",
      sector: "Software",
      foundationYear: 1975,
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
