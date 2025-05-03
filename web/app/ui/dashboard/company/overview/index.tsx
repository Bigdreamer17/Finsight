import type { companyIdType } from "../common/types";
import CompanyBreakDown from "./CompanyBreakDown";
import CompanyChart from "./CompanyChart";
import { getBreakDownProps } from "./utils";

const CompanyOverview = ({ companyId }: companyIdType) => {
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
        Microsoft Corporation develops, licenses, and supports software,
        services, devices, and solutions worldwide. The company operates in
        three segments: Productivity and Business Processes, Intelligent Cloud,
        and More Personal Computing. The Productivity and Business Processes
        segment offers Office, Exchange, SharePoint, Microsoft Teams, Office 365
        Security and Compliance, Microsoft Viva, and Skype for Business; Skype,
        Outlook.com, OneDrive, and LinkedIn; and Dynamics 365, a set of
        cloud-based and on-premises business solutions for organizations and
        enterprise divisions. The Intelligent Cloud segment licenses SQL,
        Windows Servers, Visual Studio, System Center, and related Client Access
        Licenses; GitHub that provides a collaboration platform and code hosting
        service for developers; Nuance provides healthcare and enterprise AI
        solutions; and Azure, a cloud platform. It also offers enterprise
        support, Microsoft consulting, and nuance professional services to
        assist customers in developing, deploying, and managing Microsoft server
        and desktop solutions; and training and certification on Microsoft
        products. The More Personal Computing segment provides Windows original
        equipment manufacturer (OEM) licensing and other non-volume licensing of
        the Windows operating system; Windows Commercial, such as volume
        licensing of the Windows operating system, Windows cloud services, and
        other Windows commercial offerings; patent licensing; and Windows
        Internet of Things. It also offers Surface, PC accessories, PCs,
        tablets, gaming and entertainment consoles, and other devices; Gaming,
        including Xbox hardware, and Xbox content and services; video games and
        third-party video game royalties; and Search, including Bing and
        Microsoft advertising. The company sells its products through OEMs,
        distributors, and resellers; and directly through digital marketplaces,
        online stores, and retail stores. Microsoft Corporation was founded in
        1975 and is headquartered in Redmond, Washington.`,
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
