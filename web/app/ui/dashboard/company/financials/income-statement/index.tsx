import IncomeStatementTable from "./IncomeStatementTable";
import SearchMetric from "./SearchMetric";
import type { IncomeStatementProps, incomeStatementType } from "./types";

const IncomeStatement = ({ companyId, metric }: IncomeStatementProps) => {
  interface comp {
    incomeStatement: incomeStatementType[];
  }
  const companyData: { [key: string]: comp } = {
    "123": {
      incomeStatement: [
        {
          year: "2025",
          totalRevenue: 200000,
          costOfGoodsSold: 20000,
          grossProfit: 150322,
          totalOperatingExpenses: 30000,
        },
        {
          year: "2024",
          totalRevenue: 200000,
          costOfGoodsSold: 20000,
          grossProfit: 150322,
          totalOperatingExpenses: 30000,
        },
        {
          year: "2023",
          totalRevenue: 200000,
          costOfGoodsSold: 20000,
          grossProfit: 150322,
          totalOperatingExpenses: 30000,
        },
        {
          year: "2022",
          totalRevenue: 200000,
          costOfGoodsSold: 20000,
          grossProfit: 150322,
          totalOperatingExpenses: 30000,
        },
        {
          year: "2021",
          totalRevenue: 200000,
          costOfGoodsSold: 20000,
          grossProfit: 150322,
          totalOperatingExpenses: 30000,
        },
      ],
    },
  };
  const data = companyData[companyId];

  return (
    <div className="flex flex-col gap-2">
      <SearchMetric />
      <IncomeStatementTable tableData={data?.incomeStatement || []} />
    </div>
  );
};

export default IncomeStatement;
