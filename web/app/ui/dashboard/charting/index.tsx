import { fetchAllCharts } from "@/app/lib/fetchs/get-charts";
import type { companyIdType } from "../company/common/types";
import type { chartDataType } from "./types";
import { chartsMap } from "../company/overview/data";
import Chart from "../company/key-metrics/RevenueChart";

const Charting = async ({ companyId }: companyIdType) => {
  const chartsData: chartDataType = await fetchAllCharts({
    companyId,
  });

  return (
    <div className="mt-2.5 px-4 flex flex-col gap-3 pb-5">
      <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col gap-4">
        <h3 className="text-xl font-medium flex flex-wrap">Charts</h3>

        <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col md:flex-row gap-4">
          <Chart
            data={chartsData["revenue"]}
            chartName={chartsMap["revenue"]}
            toolTipTitle="birr in revenue"
          />

          <Chart
            data={chartsData["net_profit"]}
            chartName={chartsMap["net_profit"]}
            toolTipTitle="birr of net profit"
          />
        </div>

        <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col md:flex-row gap-4">
          <Chart
            data={chartsData["eps"]}
            chartName={chartsMap["eps"]}
            toolTipTitle=""
          />

          <Chart
            data={chartsData["assets"]}
            chartName={chartsMap["assets"]}
            toolTipTitle="birr in assets"
          />
        </div>

        <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col md:flex-row gap-4">
          <Chart
            data={chartsData["equity"]}
            chartName={chartsMap["equity"]}
            toolTipTitle="birr in equity"
          />
        </div>
      </div>
    </div>
  );
};

export default Charting;
