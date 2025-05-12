"use client";
import type { chartProps } from "./types";
import { AreaGraph } from "../../common/Charts";

const RevenueChart = ({ chartName, toolTipTitle, data }: chartProps) => {
  return (
    <div className="flex basis-1/2 flex-col gap-5">
      <h3 className="text-xl">{chartName}</h3>

      <div className="border-b border-r border-[#40404F] md:mr-5 relative z-0">
        <AreaGraph toolTipTitle={toolTipTitle} data={data} />

        <p className="text-center text-xs font-light">Year</p>
      </div>
    </div>
  );
};

export default RevenueChart;
