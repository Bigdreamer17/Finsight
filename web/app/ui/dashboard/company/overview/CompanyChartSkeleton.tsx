"use client";

import { useAtom } from "jotai";
import { chartsAtom } from "@/app/store/charts";
import { IoCloseOutline } from "react-icons/io5";
import SearchChart from "./SearchChart";
import { AreaGraphSkeleton } from "../../common/ChartsSkeletons";
import { chartsMap } from "./data";

const CompanyChartSkeleton = () => {
  const [charts] = useAtom(chartsAtom);

  return (
    <div className="rounded-lg bg-[#2C2C35] p-4 basis-1/2 shrink-0">
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
              disabled
            >
              <IoCloseOutline size={16} />
            </button>
          </div>
        ))}
      </div>

      {charts.map((c, index) => {
        return (
          <div key={index} className="flex flex-col gap-5">
            <h3 className="text-xl">{chartsMap[c.name]}</h3>

            <div className="border-b border-r border-[#40404F] mr-5 pr-4 relative z-0">
              <AreaGraphSkeleton />

              <p className="text-center text-xs font-light">Year</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompanyChartSkeleton;
