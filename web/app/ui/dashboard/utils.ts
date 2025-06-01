import type { companyDashboard, metricType } from "./types";

export const getDashbaordTableData = (
  company: companyDashboard,
): { [key: string]: string } => {
  return {
    name: company.name,
    sector: company.sector ?? "-",
    roe: company.roe
      ? `${(company.roe * 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%`
      : "-",
    eps:
      company.eps?.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }) ?? "-",
    debt_to_equity: company.debt_to_equity
      ? `${(company.debt_to_equity * 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%`
      : "-",
    profit_margin: company.profit_margin
      ? `${(company.profit_margin * 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%`
      : "-",
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
  if (money >= 1_000_000_000_000) {
    return `${(money / 1_000_000_000_000).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}T`;
  } else if (money >= 1_000_000_000) {
    return `${(money / 1_000_000_000).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}B`;
  } else if (money >= 1_000_000) {
    return `${(money / 1_000_000).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}M`;
  } else {
    return money.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
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
