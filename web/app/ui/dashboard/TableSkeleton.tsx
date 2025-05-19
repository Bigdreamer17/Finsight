"use client";

import { useAtom } from "jotai";
import { dashboardMetricAtom } from "@/app/store/dashboardMetrics";
import { IoCloseOutline } from "react-icons/io5";

import {
  Table as TableMain,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import { RiArrowUpDownLine } from "react-icons/ri";

const TableSkeleton = () => {
  const [metrics] = useAtom(dashboardMetricAtom);

  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="flex flex-col flex-1 gap-3">
      <div className="flex items-center gap-3 flex-wrap">
        {metrics.slice(1).map((metric, index) => (
          <div
            key={index}
            className="bg-[#40404F] py-1 px-2 flex items-center gap-1 rounded-2xl text-xs"
          >
            <span>{metric.name}</span>

            <button className="rounded-full" disabled>
              <IoCloseOutline size={16} />
            </button>
          </div>
        ))}
      </div>

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
                  disabled
                >
                  <span>{metric.name}</span>

                  <div className="flex justify-center items-center hover:cursor-pointer">
                    <RiArrowUpDownLine size={17} />
                  </div>
                </button>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from(rows, (_, index) => {
            return (
              <TableRow
                key={index}
                className={`${index % 2 === 0 ? "bg-[#2C2C35]" : "bg-[#40404F]"}`}
              >
                {metrics.map((_, idx) => {
                  return (
                    <TableCell
                      key={idx}
                      className={`text-center ${idx !== metrics.length - 1 ? "border-r border-[#AFAFB6]/40" : ""}`}
                    >
                      <div
                        className={`h-5 w-full rounded-md animate-pulse ${index % 2 !== 0 ? "bg-[#2C2C35]" : "bg-[#40404F]"}`}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </TableMain>
    </div>
  );
};

export default TableSkeleton;
