"use client";

import { searchParamOption } from "@/app/lib/search-params";
import { useQueryStates } from "nuqs";
import { searchParams } from "./search-params";
import SearchInput from "./common/SearchInput";
import type { metricType, searchProps } from "./types";
import { useEffect, useRef, useState } from "react";
import { metrics as dashboardMetrics } from "./data";
import { useAtom } from "jotai";
import { dashboardMetricAtom } from "@/app/store/dashboardMetrics";
import { checkIsActiveMetric } from "./utils";
import { handleClickOutside } from "@/app/lib/utils/handleClickOutside";

const SearchMetric = ({ paginationQuery }: searchProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [finalMetrics, setFinalMetrics] = useState(dashboardMetrics);
  const [metrics, setMetrics] = useAtom(dashboardMetricAtom);
  const ref = useRef<HTMLDivElement>(null);

  const [{ metric }, setParams] = useQueryStates(
    searchParams,
    searchParamOption,
  );

  useEffect(() => {
    const filteredMetrics = dashboardMetrics.filter((m) =>
      m.name.toLowerCase().includes(metric.toLowerCase()),
    );

    setFinalMetrics(filteredMetrics);
  }, [metric, setFinalMetrics]);

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
    setParams((prev) => ({ ...prev, metric: term }));

    if (paginationQuery) {
      setParams((prev) => ({ ...prev, [paginationQuery]: 1 }));
    }
  };

  const handleClick = (newMetric: metricType, isActive: boolean) => {
    if (isActive) {
      return;
    }

    if (newMetric.name === "Sector") {
      setMetrics((prev) => [...prev.slice(0, 1), newMetric, ...prev.slice(1)]);
    } else {
      setMetrics((prev) => [...prev.slice(0, 2), newMetric, ...prev.slice(2)]);
    }
  };

  return (
    <div ref={ref} className="relative focus-within::z-30 grow flex-1">
      <SearchInput
        onFocus={() => setIsFocused(true)}
        defaultValue={metric}
        handleSearch={handleSearch}
        placeHolder="Select and search metrics"
        className="border border-transparent focus:border-[#AFAFB6] bg-[#1C1C21] placeholder:text-[#AFAFB6] text-white text-sm py-2 pr-4 pl-10 transform transition duration-200 ease-in-out"
      />

      {isFocused && (
        <div className="absolute no-scrollbar border border-[#AFAFB6] max-h-[70svh] overflow-y-auto p-1 z-30 top-full left-0 right-0 mt-2 flex flex-col gap-1 rounded-lg bg-[#2C2C35]">
          {finalMetrics.length > 0 ? (
            finalMetrics.map((m, index) => {
              const isActive = checkIsActiveMetric(m.name, metrics);

              return (
                <button
                  key={index}
                  disabled={isActive}
                  onClick={() => handleClick(m, isActive)}
                  className="flex items-center justify-between p-2 rounded-md gap-2.5 hover:bg-[#40404F] disabled:text-[#AFAFB6] disabled:hover:bg-inherit"
                >
                  <span className="font-medium">{m.name}</span>
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

export default SearchMetric;
