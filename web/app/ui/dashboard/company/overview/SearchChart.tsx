"use client";

import { searchParamOption } from "@/app/lib/search-params";
import { useQueryStates } from "nuqs";
import { searchParams } from "../../search-params";
import SearchInput from "../../common/SearchInput";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { chartsData, chartsMap } from "./data";
import { chartsAtom } from "@/app/store/charts";
import { handleClickOutside } from "@/app/lib/utils/handleClickOutside";
import { checkIsActiveChart } from "./utils";
import type { chartMetricsType } from "./types";

const SearchChart = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [charts, setCharts] = useAtom(chartsAtom);
  const ref = useRef<HTMLDivElement>(null);

  const [{ chart }, setParams] = useQueryStates(
    searchParams,
    searchParamOption,
  );

  const finalCharts = chartsData.filter((c) =>
    c.name.toLowerCase().includes(chart.toLowerCase()),
  );

  useEffect(() => {
    function handleClickEvent(event: MouseEvent) {
      handleClickOutside(event, ref, handleClose);
    }

    document.addEventListener("mousedown", handleClickEvent);

    return () => {
      document.removeEventListener("mousedown", handleClickEvent);
    };
  }, []);

  const handleClose = () => {
    setIsFocused(false);
  };

  const handleSearch = (term: string) => {
    setParams((prev) => ({ ...prev, chart: term }));
  };

  const handleClick = (newMetric: chartMetricsType, isActive: boolean) => {
    if (isActive) {
      return;
    }

    setCharts((prev) => [newMetric, ...prev]);
  };

  return (
    <div ref={ref} className="relative z-20 grow flex-1">
      <SearchInput
        onFocus={() => setIsFocused(true)}
        defaultValue={chart}
        handleSearch={handleSearch}
        placeHolder="Search and add Chart"
        className="border border-transparent focus:border-[#AFAFB6] bg-[#1C1C21] placeholder:text-[#AFAFB6] text-white text-sm py-2 pr-4 pl-10 transform transition duration-200 ease-in-out"
      />

      {isFocused && (
        <div className="absolute no-scrollbar border border-[#AFAFB6] max-h-[70svh] overflow-y-auto p-1 z-50 top-full left-0 right-0 mt-2 flex flex-col gap-1 rounded-lg bg-[#2C2C35]">
          {finalCharts.length > 0 ? (
            finalCharts.map((c, index) => {
              const isActive = checkIsActiveChart(c.name, charts);

              return (
                <button
                  key={index}
                  disabled={isActive}
                  onClick={() => handleClick(c, isActive)}
                  className="flex items-center justify-between p-2 rounded-md gap-2.5 hover:bg-[#40404F] disabled:text-[#AFAFB6] disabled:hover:bg-inherit"
                >
                  <span className="font-medium">{chartsMap[c.name]}</span>
                </button>
              );
            })
          ) : (
            <p className="p-2 text-sm">
              No metric mathces found. Try adjusting your search
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchChart;
