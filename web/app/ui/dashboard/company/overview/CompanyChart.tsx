"use client";

import { AreaGraph } from "../../common/Charts";
import SearchChart from "./SearchChart";
import { useAtom } from "jotai";
import { IoCloseOutline } from "react-icons/io5";
import type { overviewChartType } from "./types";
import { chartsAtom } from "@/app/store/charts";
import { chartsMap } from "./data";

const CompanyChart = ({ chartData }: { chartData: overviewChartType }) => {
  const [charts, setCharts] = useAtom(chartsAtom);

  const handleChartDelete = (name: string) => {
    setCharts((prev) => prev.filter((chart) => name != chart.name));
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
            <span>{chartsMap[chart.name]}</span>

            <button
              className="rounded-full hover:bg-white/10 hover:cursor-pointer"
              onClick={() => handleChartDelete(chart.name)}
            >
              <IoCloseOutline size={16} />
            </button>
          </div>
        ))}
      </div>

      {charts.map((c, index) => {
        const chart = chartData[c.name];

        return (
          <div key={index} className="flex flex-col gap-5">
            <h3 className="text-xl">{chartsMap[c.name]}</h3>

            <div className="border-b border-r border-[#40404F] mr-5 relative z-0">
              <AreaGraph toolTipTitle={c.toolTipTitle} data={chart} />

              <p className="text-center text-xs font-light">Year</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompanyChart;
