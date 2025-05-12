import { getTruncatedMoney } from "../../utils";
import type { breakDownProps, companyOverViewType } from "./types";

export const getBreakDownProps = (
  company: companyOverViewType,
): breakDownProps => {
  return {
    name: company?.name ?? "-",
    description: company?.description ?? "-",
    ceo: company?.ceo ?? "-",
    website: company?.website ?? "-",
    sector: company?.sector ?? "-",
    foundationYear: company?.foundationYear ?? "-",

    marketCap: company?.profile?.marketCap
      ? `${getTruncatedMoney(company.profile.marketCap)} Birr`
      : "-",
    ev: company?.profile?.ev
      ? `${getTruncatedMoney(company.profile.ev)} Birr`
      : "-",
    sharesOut: company?.profile?.shares
      ? `${getTruncatedMoney(company.profile.shares)} Birr`
      : "-",
    revenue: company?.profile?.revenue
      ? `${getTruncatedMoney(company.profile.revenue)} Birr`
      : "-",
    employeeCount: company?.profile?.employees
      ? `${getTruncatedMoney(company.profile.employees)} Birr`
      : "-",

    pe: company?.valuation?.pe ?? "-",
    pb: company?.valuation?.pb ?? "-",
    evSales: company?.valuation?.evSales ?? "-",
    evEbitda: company?.valuation?.evEbitda ?? "-",
    pfcf: company?.valuation?.pfcf ?? "-",
    evGrossProfit: company?.valuation?.evGrossProfit ?? "-",

    revThree: company?.growth?.revThree ? `${company.growth.revThree}%` : "-",
    revFive: company?.growth?.revFive ? `${company.growth.revFive}%` : "-",
    revTen: company?.growth?.revTen ? `${company.growth.revTen}%` : "-",
    deThree: company?.growth?.deThree ? `${company.growth.deThree}%` : "-",
    deFive: company?.growth?.deFive ? `${company.growth.deFive}%` : "-",
    deTen: company?.growth?.deTen ? `${company.growth.deTen}%` : "-",
    revFwdTwo: company?.growth?.revFwdTwo
      ? `${company.growth.revFwdTwo}%`
      : "-",

    gross: company?.margins?.gross ? `${company.margins.gross}%` : "-",
    ebitda: company?.margins?.ebitda ? `${company.margins.ebitda}%` : "-",
    operating: company?.margins?.operating
      ? `${company.margins.operating}%`
      : "-",
    preTax: company?.margins?.preTax ? `${company.margins.preTax}%` : "-",
    net: company?.margins?.net ? `${company.margins.net}%` : "-",
    fcf: company?.margins?.fcf ? `${company.margins.fcf}%` : "-",

    roa: company?.returns?.roa ? `${company.returns.roa}%` : "-",
    rota: company?.returns?.rota ? `${company.returns.rota}%` : "-",
    roe: company?.returns?.roe ? `${company.returns.roe}%` : "-",
    roce: company?.returns?.roce ? `${company.returns.roce}%` : "-",
    roic: company?.returns?.roic ? `${company.returns.roic}%` : "-",

    divYield: company?.dividends?.divYield
      ? `${company.dividends.divYield}%`
      : "-",
    payout: company?.dividends?.payout ? `${company.dividends.payout}%` : "-",
    dps: company?.dividends?.dps
      ? `${getTruncatedMoney(company.dividends.dps)} Birr`
      : "-",
    dpsThree: company?.dividends?.dpsThree
      ? `${company.dividends.dpsThree}%`
      : "-",
    dpsFive: company?.dividends?.dpsFive
      ? `${company.dividends.dpsFive}%`
      : "-",
  };
};

export const checkIsActiveChart = (
  metricName: string,
  metrics: string[],
): boolean => {
  for (const metric of metrics) {
    if (metric === metricName) {
      return true;
    }
  }

  return false;
};
