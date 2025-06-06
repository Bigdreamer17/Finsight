"use client";

import { searchParamOption } from "@/app/lib/search-params";
import { useQueryStates } from "nuqs";
import { searchParams } from "../../../search-params";
import SearchInput from "../../../common/SearchInput";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { incomeStatementMetricsAtom } from "@/app/store/financialsMetrics";
import { fieldsMap, incomeStatementMetrics } from "./data";
import { handleClickOutside } from "@/app/lib/utils/handleClickOutside";
import { metricType } from "../../../types";
import { checkIsActiveMetric } from "../../../utils";
import { searchProps } from "../types";
import { GoLock } from "react-icons/go";

const SearchMetric = ({ paginationQuery }: searchProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [metrics, setMetrics] = useAtom(incomeStatementMetricsAtom);
  const ref = useRef<HTMLDivElement>(null);

  const [{ metric }, setParams] = useQueryStates(
    searchParams,
    searchParamOption,
  );

  const filteredMetrics = incomeStatementMetrics.filter((m) => !m.isLast);
  const finalMetrics = filteredMetrics.filter((m) =>
    m.name.toLowerCase().includes(metric.toLowerCase()),
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
    setParams((prev) => ({ ...prev, metric: term }));

    if (paginationQuery) {
      setParams((prev) => ({ ...prev, [paginationQuery]: 1 }));
    }
  };

  const handleClick = (newMetric: metricType, isActive: boolean) => {
    if (isActive) {
      return;
    }

    setMetrics((prev) => {
      const grouping = newMetric.grouping ?? "";
      const group = prev.find((m) => m.name === grouping);
      const groupIndex = group ? prev.indexOf(group) : prev.length;

      const newMetrics = [
        ...prev.slice(0, groupIndex),
        newMetric,
        ...prev.slice(groupIndex),
      ];

      return newMetrics;
    });
  };

  return (
    <div className="relative focus-within::z-30 max-w-fit min-w-1/2">
      <SearchInput
        onFocus={() => setIsFocused(true)}
        defaultValue={metric}
        handleSearch={handleSearch}
        placeHolder="Search metrics"
        className="border border-transparent max-w-2xl focus:border-[#AFAFB6] bg-[#1C1C21] placeholder:text-[#AFAFB6] text-white text-sm py-2 pr-4 pl-10 transform transition duration-200 ease-in-out"
      />

      {isFocused && (
        <div
          ref={ref}
          className="absolute no-scrollbar border border-[#AFAFB6] max-h-[40svh] overflow-y-auto p-1 z-20 top-full left-0 right-0 mt-2 flex flex-col gap-1 rounded-lg bg-[#2C2C35]"
        >
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
                  <span className="font-medium">{fieldsMap[m.name]}</span>

                  {m.isPaidFeature && <GoLock size={16} />}
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
