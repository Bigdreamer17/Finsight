import { FinancialBadge, InvestmentBadge } from "../../common/Badges";
import type { pieDataType } from "../../common/types";
import type { companyIdType } from "../common/types";
import DebtToEquityRationChart from "./DebtToEquityRationChart";
import NetProfitChart from "./NetProfitChart";
import PerformanceIndicators from "./PerformanceIndicators";
import RevenueChart from "./RevenueChart";
import ROICalculator from "./ROICalculator";
import type { chartProps, performanceIndicatorsType } from "./types";

const KeyMetrics = ({ companyId }: companyIdType) => {
  interface comp {
    financialHealth: string;
    growthComparision?: string;
    industryAvg?: number;
    growthRanking?: string;
    investementPotential?: string;
    performanceIndicators?: performanceIndicatorsType;
    revenueChart: chartProps;
    netProfitChart: chartProps;
    debtToEquityChart: pieDataType[];
  }
  const companies: { [key: string]: comp } = {
    "2d12ea5a-dce7-4722-8014-bf596514cbe7": {
      financialHealth: "Very strong buy(A)",
      growthComparision: "Top 20 in growth",
      industryAvg: 60002,
      growthRanking: "Above industry average",
      investementPotential: "High investement potential",
      performanceIndicators: {
        roa: 32,
        roe: 15,
        buyersProfitablity: "Strong profitability",
        riskLevel: "Low risk",
        debtToEquity: 69,
      },
      revenueChart: {
        chartName: "Revenue Growth",
        toolTipTitle: "Growth",
        data: [
          { date: "2025-04-02", count: 1000 },
          { date: "2025-04-02", count: 1200 },
          { date: "2025-04-02", count: 1400 },
          { date: "2025-04-02", count: 1600 },
          { date: "2025-04-02", count: 1200 },
          { date: "2025-04-02", count: 2000 },
        ],
      },
      netProfitChart: {
        chartName: "Net Profit Growth",
        toolTipTitle: "Growth",
        data: [
          { date: "2025-04-02", count: 1000 },
          { date: "2025-04-02", count: 1200 },
          { date: "2025-04-02", count: 1400 },
          { date: "2025-04-02", count: 1600 },
          { date: "2025-04-02", count: 1200 },
          { date: "2025-04-02", count: 2000 },
        ],
      },
      debtToEquityChart: [
        { name: "Equity", value: 420000 },
        { name: "Debt", value: 200000 },
      ],
    },
  };
  const companyData = companies[companyId];

  return (
    <div className="mt-5 px-4 flex flex-col gap-3 pb-5">
      <h3 className="text-xl font-medium flex flex-wrap">
        Financial health of company:
        <span className="min-w-fit flex items-center gap-1">
          <span>{<FinancialBadge health={companyData.financialHealth} />}</span>{" "}
          {companyData.financialHealth}
        </span>
      </h3>

      <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col gap-4">
        <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col md:flex-row gap-4">
          <RevenueChart {...companyData.revenueChart} />

          <NetProfitChart {...companyData.netProfitChart} />
        </div>

        <div className="flex flex-col gap-2">
          <p className="flex items-center flex-wrap font-medium gap-2">
            Growth compared to others in the industry:
            <span className="text-sm font-light">
              {companyData?.growthComparision ?? "-"}
            </span>
          </p>

          <p className="flex items-center flex-wrap font-medium gap-2">
            Industry average number:
            <span className="text-sm font-light">
              {companyData?.industryAvg ?? "-"}
            </span>
          </p>

          <p className="flex items-center flex-wrap font-medium gap-2">
            Growth ranking:
            <span className="text-sm font-light">
              {companyData?.growthRanking ?? "-"}
            </span>
          </p>

          <p className="flex items-center flex-wrap font-medium gap-2">
            Investment potential:
            <span className="text-sm font-light flex items-center gap-1">
              <InvestmentBadge
                health={companyData?.investementPotential ?? ""}
              />
              {companyData?.investementPotential ?? "-"}
            </span>
          </p>
        </div>
      </div>

      <h3 className="text-xl font-medium flex">Performance indicators:</h3>

      <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col md:items-center md:flex-row pb-6 gap-4">
        <PerformanceIndicators
          performanceIndicators={companyData?.performanceIndicators}
        />

        <DebtToEquityRationChart data={companyData?.debtToEquityChart} />
      </div>

      <h3 className="text-xl font-medium flex">ROI calculator:</h3>

      <ROICalculator companyId={companyId} />
    </div>
  );
};

export default KeyMetrics;
