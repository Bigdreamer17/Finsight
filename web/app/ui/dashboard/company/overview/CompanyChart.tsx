"use client";

import { AreaGraph } from "../../common/Charts";
import SearchChart from "./SearchChart";
import { useAtom } from "jotai";
import { IoCloseOutline } from "react-icons/io5";
import type { chartsType } from "./types";
import { chartsAtom } from "@/app/store/charts";
import { chartsMap } from "./data";

const CompanyChart = () => {
  const [charts, setCharts] = useAtom(chartsAtom);

  const chartData: chartsType = {
    revenueGrowthFive: {
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
  };

  const handleChartDelete = (name: string) => {
    setCharts((prev) => prev.filter((chart) => name != chart));
  };

  return (
    <div className="rounded-lg bg-[#2C2C35] p-4 basis-1/2">
      <SearchChart />

      <div className="flex items-center gap-3 flex-wrap mt-3 mb-7">
        {charts.map((chart, index) => (
          <div
            key={index}
            className="bg-[#40404F] py-1 px-2 flex items-center gap-1 rounded-2xl text-xs"
          >
            <span>{chart}</span>

            <button
              className="rounded-full hover:bg-white/10 hover:cursor-pointer"
              onClick={() => handleChartDelete(chart)}
            >
              <IoCloseOutline size={16} />
            </button>
          </div>
        ))}
      </div>

      {charts.map((c, index) => {
        const chartKey = chartsMap[c];
        const chart = chartData[chartKey];

        return (
          <div key={index} className="flex flex-col gap-5">
            <h3 className="text-xl">{c}</h3>

            <div className="border-b border-r border-[#40404F] mr-5 relative z-0">
              <AreaGraph toolTipTitle={chart.toolTipTitle} data={chart.data} />

              <p className="text-center text-xs font-light">Year</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompanyChart;
