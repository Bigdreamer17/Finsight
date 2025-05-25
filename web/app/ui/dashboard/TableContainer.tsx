"use client";

import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import {
  Table as TableMain,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import { searchParams } from "./search-params";
import { searchParamOption } from "@/app/lib/search-params";
import { useQueryStates } from "nuqs";
import { RiArrowUpDownLine } from "react-icons/ri";
import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";
import { metricMap } from "./data";
import type { TableProps } from "./types";
import { getDashbaordTableData } from "./utils";
import { useAtom } from "jotai";
import { dashboardMetricAtom } from "@/app/store/dashboardMetrics";
import { GoLock } from "react-icons/go";
import EmptyTable from "./common/EmptyTable";

const TableContainer = ({ comp }: TableProps) => {
  const [metrics, setMetrics] = useAtom(dashboardMetricAtom);
  const [companies, setCompanies] = useState(comp);

  const [{ sortMetric, sortParam, companyFilter }, setParams] = useQueryStates(
    searchParams,
    searchParamOption,
  );

  useEffect(() => {
    const filteredCompanies = comp.filter((c) =>
      c.companyName.toLowerCase().includes(companyFilter.toLowerCase()),
    );

    setCompanies(filteredCompanies);
  }, [companyFilter, comp]);

  const handleMetricDelete = (metric: string) => {
    setMetrics((prev) => prev.filter((m) => m.name != metric));
  };

  const handleSortClick = (param: string) => {
    const newMetric =
      sortMetric === "Desc" && param === sortParam ? "Asc" : "Desc";
    setParams((prev) => ({ ...prev, sortMetric: newMetric, sortParam: param }));
  };

  return (
    <div className="flex flex-col flex-1 gap-3">
      <div className="flex items-center gap-3 flex-wrap">
        {metrics.slice(1).map((metric, index) => (
          <div
            key={index}
            className="bg-[#40404F] py-1 px-2 flex items-center gap-1 rounded-2xl text-xs"
          >
            <span>{metric.name}</span>

            <button
              className="rounded-full hover:bg-white/10 hover:cursor-pointer"
              onClick={() => handleMetricDelete(metric.name)}
            >
              <IoCloseOutline size={16} />
            </button>
          </div>
        ))}
      </div>

      {companies.length > 0 ? (
        <TableMain>
          <TableHeader className="bg-[#1C1C21] border-[#AFAFB6]/40 border-y text-xs">
            <TableRow>
              {metrics.map((metric, index) => (
                <TableHead
                  key={index}
                  className={
                    index !== metrics.length - 1
                      ? "border-r border-[#AFAFB6]/40"
                      : ""
                  }
                >
                  <button
                    className="flex items-center gap-3 hover:cursor-pointer w-full focus:outline-none"
                    onClick={() => handleSortClick(metricMap[metric.name])}
                  >
                    <span>{metric.name}</span>

                    <div className="flex justify-center items-center hover:cursor-pointer">
                      <RiArrowUpDownLine
                        size={17}
                        className={
                          sortMetric !== "" &&
                          sortParam === metricMap[metric.name]
                            ? "hidden"
                            : "p-0"
                        }
                      />

                      <HiArrowNarrowUp
                        size={17}
                        className={
                          sortMetric === "Desc" ||
                          sortParam !== metricMap[metric.name]
                            ? "hidden"
                            : "p-0"
                        }
                      />

                      <HiArrowNarrowDown
                        size={17}
                        className={
                          sortMetric === "Asc" ||
                          sortParam !== metricMap[metric.name]
                            ? "hidden"
                            : ""
                        }
                      />
                    </div>
                  </button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company, index) => {
              const rowData = getDashbaordTableData(company);

              return (
                <TableRow
                  key={index}
                  className={`${index % 2 === 0 ? "bg-[#2C2C35]" : "bg-[#40404F]"}`}
                >
                  {metrics.map((metric, idx) => {
                    const rowDataKey = metricMap[metric.name];
                    const data = rowData[rowDataKey];

                    return (
                      <TableCell
                        key={idx}
                        className={`text-center ${idx !== metrics.length - 1 ? "border-r border-[#AFAFB6]/40" : ""}`}
                      >
                        {metric.isPaidFeature ? (
                          <GoLock size={16} className="mx-auto" />
                        ) : (
                          (data ?? "-")
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </TableMain>
      ) : (
        <EmptyTable />
      )}
    </div>
  );
};

export default TableContainer;
