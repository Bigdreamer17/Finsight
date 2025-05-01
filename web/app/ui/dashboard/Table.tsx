"use client";

import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import {
  Table as TableContainer,
  TableBody,
  TableCaption,
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

const Table = () => {
  const [metrics, setMetrics] = useState<string[]>([
    "Invoice",
    "Status",
    "Method",
    "Amount",
  ]);

  const tableData = ["INV002", "Paid", "Credit Card", "$250.00"];

  const [{ sortMetric, sortParam }, setParams] = useQueryStates(
    searchParams,
    searchParamOption,
  );

  const handleMetricDelete = (metric: string) => {
    setMetrics((prev) => prev.filter((m) => m != metric));
  };

  const handleSortClick = (param: string) => {
    const newMetric = sortMetric === "Desc" ? "Asc" : "Desc";
    setParams((prev) => ({ ...prev, sortMetric: newMetric, sortParam: param }));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 flex-wrap">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-[#40404F] py-1 px-2 flex items-center gap-1 rounded-2xl text-xs"
          >
            <span>{metric}</span>

            <button
              className="rounded-full hover:bg-white/10 hover:cursor-pointer"
              onClick={() => handleMetricDelete(metric)}
            >
              <IoCloseOutline size={16} />
            </button>
          </div>
        ))}
      </div>

      <TableContainer>
        <TableCaption>A list of your recent invoices.</TableCaption>
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
                  onClick={() => handleSortClick(metric.toLowerCase())}
                >
                  <span>{metric}</span>

                  <div className="flex justify-center items-center hover:cursor-pointer">
                    <RiArrowUpDownLine
                      size={17}
                      className={
                        sortMetric !== "" && sortParam === metric.toLowerCase()
                          ? "hidden"
                          : "p-0"
                      }
                    />

                    <HiArrowNarrowUp
                      size={17}
                      className={
                        sortMetric === "Desc" ||
                        sortParam !== metric.toLowerCase()
                          ? "hidden"
                          : "p-0"
                      }
                    />

                    <HiArrowNarrowDown
                      size={17}
                      className={
                        sortMetric === "Asc" ||
                        sortParam !== metric.toLowerCase()
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
          <TableRow>
            {tableData.map((data, index) => (
              <TableCell key={index}>{data}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </TableContainer>
    </div>
  );
};

export default Table;
