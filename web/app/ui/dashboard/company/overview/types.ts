import type { dataType } from "../../common/types";

export type breakDownProps = {
  name: string;
  description: string;
  ceo: string;
  website: string;
  sector: string;
  foundationYear: number | string;

  marketCap: number | string;
  ev: number | string;
  sharesOut: number | string;
  revenue: number | string;
  employeeCount: number | string;
  pe: number | string;
  pb: number | string;
  evSales: number | string;
  evEbitda: number | string;
  pfcf: number | string;
  evGrossProfit: number | string;

  revThree: number | string;
  revFive: number | string;
  revTen: number | string;
  deThree: number | string;
  deFive: number | string;
  deTen: number | string;
  revFwdTwo: number | string;

  gross: number | string;
  ebitda: number | string;
  operating: number | string;
  preTax: number | string;
  net: number | string;
  fcf: number | string;

  roa: number | string;
  rota: number | string;
  roe: number | string;
  roce: number | string;
  roic: number | string;

  divYield: number | string;
  payout: number | string;
  dps: number | string;
  dpsThree: number | string;
  dpsFive: number | string;
};

export type companyOverViewType = {
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
};

export type chartsType = { [key: string]: chartType };

export type chartsMapType = { [key: string]: string };

interface chartType {
  toolTipTitle: string;
  data: dataType[];
}
