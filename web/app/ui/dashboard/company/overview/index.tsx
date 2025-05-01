import type { companyIdType } from "../common/types";
import CompanyBreakDown from "./CompanyBreakDown";
import CompanyChart from "./CompanyChart";

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
      marketCap?: string;
      ev?: string;
      shares?: string;
      revenue?: string;
      employees?: string;
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
      revThree?: string;
      revFive?: string;
      revTen?: string;
      deThree?: string;
      deFive?: string;
      deTen?: string;
      revFwdTwo?: string;
    };
    margins?: {
      gross?: string;
      ebitda?: string;
      operating?: string;
      preTax?: string;
      net?: string;
      fcf?: string;
    };
    returns?: {
      roa?: string;
      rota?: string;
      roe?: string;
      roce?: string;
      roic?: string;
    };
    dividends?: {
      divYield?: string;
      payout?: string;
      dps?: string;
      dpsThree?: string;
      dpsFive?: string;
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
        marketCap: "$2.94T",
        ev: "$2.92T",
        shares: "7.4B",
        revenue: "$261.80B",
        employees: "228,000",
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
        revThree: "12.3%",
        revFive: "4.3%",
        revTen: "10.9%",
        deThree: "9.7%",
        deFive: "16.7%",
        // deTen: "17.5%",
        revFwdTwo: "13.2%",
      },
      margins: {
        gross: "69.4%",
        // ebitda: "54.3%",
        operating: "45.0%",
        preTax: "43.4%",
        net: "35.4%",
        fcf: "26.7%",
      },
      returns: {
        roa: "19.8%",
        // rota: "44.8%",
        roe: "41.9%",
        roce: "31.0%",
        roic: "28.0%",
      },
      dividends: {
        divYield: "0.8%",
        payout: "25.3%",
        // dps: "$3.00",
        dpsThree: "10.2%",
        dpsFive: "10.2%",
      },
    },
  };

  const company = companyDet[companyId];

  const breakDownProps = {
    name: company?.name ?? "-",
    description: company?.description ?? "-",
    ceo: company?.ceo ?? "-",
    website: company?.website ?? "-",
    sector: company?.sector ?? "-",
    foundationYear: company?.foundationYear ?? "-",
    marketCap: company?.profile?.marketCap ?? "-",
    ev: company?.profile?.ev ?? "-",
    sharesOut: company?.profile?.shares ?? "-",
    revenue: company?.profile?.revenue ?? "-",
    employeeCount: company?.profile?.employees ?? "-",
    pe: company?.valuation?.pe ?? "-",
    pb: company?.valuation?.pb ?? "-",
    evSales: company?.valuation?.evSales ?? "-",
    evEbitda: company?.valuation?.evEbitda ?? "-",
    pfcf: company?.valuation?.pfcf ?? "-",
    evGrossProfit: company?.valuation?.evGrossProfit ?? "-",
    revThree: company?.growth?.revThree ?? "-",
    revFive: company?.growth?.revFive ?? "-",
    revTen: company?.growth?.revTen ?? "-",
    deThree: company?.growth?.deThree ?? "-",
    deFive: company?.growth?.deFive ?? "-",
    deTen: company?.growth?.deTen ?? "-",
    revFwdTwo: company?.growth?.revFwdTwo ?? "-",
    gross: company?.margins?.gross ?? "-",
    ebitda: company?.margins?.ebitda ?? "-",
    operating: company?.margins?.operating ?? "-",
    preTax: company?.margins?.preTax ?? "-",
    net: company?.margins?.net ?? "-",
    fcf: company?.margins?.fcf ?? "-",
    roa: company?.returns?.roa ?? "-",
    rota: company?.returns?.rota ?? "-",
    roe: company?.returns?.roe ?? "-",
    roce: company?.returns?.roce ?? "-",
    roic: company?.returns?.roic ?? "-",
    divYield: company?.dividends?.divYield ?? "-",
    payout: company?.dividends?.payout ?? "-",
    dps: company?.dividends?.dps ?? "-",
    dpsThree: company?.dividends?.dpsThree ?? "-",
    dpsFive: company?.dividends?.dpsFive ?? "-",
  };

  return (
    <div className="flex flex-col gap-3 xl:flex-row items-stretch mt-5">
      <CompanyBreakDown {...breakDownProps} />
      <CompanyChart />
    </div>
  );
};

export default CompanyOverview;
