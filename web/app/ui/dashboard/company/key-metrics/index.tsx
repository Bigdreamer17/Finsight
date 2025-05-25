import { fetchCompanyOverviewCharts } from "@/app/lib/fetchs/get-charts";
import { FinancialBadge, InvestmentBadge } from "../../common/Badges";
import type { companyIdType } from "../common/types";
import type { overviewChartType } from "../overview/types";
import DebtToEquityRationChart from "./DebtToEquityRationChart";
import NetProfitChart from "./NetProfitChart";
import PerformanceIndicators from "./PerformanceIndicators";
import RevenueChart from "./RevenueChart";
import ROICalculator from "./ROICalculator";
import type {
  capitalStructureType,
  investmentSummaryType,
  performanceIndicatorsType,
  roiCalculatorMetricsType,
} from "./types";
import { chartsMap } from "../overview/data";
import {
  fetchCapitalStructure,
  fetchInvestmentSummary,
  fetchPerformanceIndicators,
  fetchROICalculatorMetrics,
} from "@/app/lib/fetchs/get-key-metrics";

const KeyMetrics = async ({ companyId }: companyIdType) => {
  const [
    chartsData,
    performanceIndicators,
    capitalStructure,
    investmentSummary,
    roiCalculatorMetrics,
  ]: [
    overviewChartType,
    performanceIndicatorsType,
    capitalStructureType,
    investmentSummaryType,
    roiCalculatorMetricsType,
  ] = await Promise.all([
    fetchCompanyOverviewCharts({ companyId }),
    fetchPerformanceIndicators({ companyId }),
    fetchCapitalStructure({ companyId }),
    fetchInvestmentSummary({ companyId }),
    fetchROICalculatorMetrics({ companyId }),
  ]);
  const companyData = {
    financialHealth: "Very strong buy(A)",
    growthComparision: "Top 20 in growth",
    industryAvg: 60002,
    growthRanking: "Above industry average",
    investementPotential: investmentSummary.investment_potential,
    performanceIndicators: {
      roa: performanceIndicators.roa * 100,
      roe: performanceIndicators.roe * 100,
      profitability: performanceIndicators.profitability,
      risk: performanceIndicators.risk,
      debt_to_equity: performanceIndicators.debt_to_equity,
    },
    roiMetrics: {
      averageRevenueGrowth: roiCalculatorMetrics.average_revenue_growth,
      averageProfitGrowth: roiCalculatorMetrics.average_profit_growth,
      averageEPSGrowth: roiCalculatorMetrics.average_eps_growth,
    },
    debtToEquityChart: [
      { name: "Equity", value: capitalStructure.equity },
      { name: "Debt", value: capitalStructure.debt },
    ],
  };

  return (
    <div className="mt-5 px-4 flex flex-col gap-3 pb-4">
      <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col gap-4">
        <h3 className="text-xl font-medium flex flex-wrap">
          Financial health of company:
          <span className="min-w-fit flex items-center gap-1">
            <span>
              {<FinancialBadge health={companyData.financialHealth} />}
            </span>{" "}
            {companyData.financialHealth}
          </span>
        </h3>

        <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col md:flex-row gap-4">
          <RevenueChart
            data={chartsData["revenue"]}
            chartName={chartsMap["revenue"]}
            toolTipTitle="birr in revenue"
          />

          <NetProfitChart
            data={chartsData["net_profit"]}
            chartName={chartsMap["net_profit"]}
            toolTipTitle="birr of net profit"
          />
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

      <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col gap-4">
        <h3 className="text-xl font-medium flex">Performance indicators:</h3>

        <div className="flex flex-col md:items-center md:flex-row pb-6 gap-4">
          <PerformanceIndicators
            performanceIndicators={companyData?.performanceIndicators}
          />

          <DebtToEquityRationChart data={companyData?.debtToEquityChart} />
        </div>
      </div>

      <ROICalculator {...companyData.roiMetrics} />
    </div>
  );
};

export default KeyMetrics;
