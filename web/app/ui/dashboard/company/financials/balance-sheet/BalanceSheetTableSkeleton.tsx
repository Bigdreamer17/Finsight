"use client";

import { useAtom } from "jotai";
import { IoCloseOutline } from "react-icons/io5";

import {
  Table as TableMain,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/table";
import { balanceSheetMetricsAtom } from "@/app/store/financialsMetrics";
import { fieldsMap } from "./data";

const BalanceSheetTableSkeleton = () => {
  const [metrics] = useAtom(balanceSheetMetricsAtom);

  const cols = [0, 1, 2, 3];

  return (
    <div className="flex flex-col flex-1 gap-3">
      <div className="flex items-center gap-3 flex-wrap">
        {metrics
          .filter((m) => !m.isLast)
          .map((metric, index) => (
            <div
              key={index}
              className="bg-[#40404F] py-1 px-2 flex items-center gap-1 rounded-2xl text-xs"
            >
              <span>{fieldsMap[metric.name]}</span>

              <button className="rounded-full" disabled>
                <IoCloseOutline size={16} />
              </button>
            </div>
          ))}
      </div>

      <TableMain>
        <TableHeader className="bg-[#1C1C21] border-[#AFAFB6]/40 border-y text-xs">
          <TableRow>
            <TableHead className="border-x border-[#AFAFB6]/40">
              Balance Sheet
            </TableHead>

            {cols.map((index) => (
              <TableHead
                key={index}
                className="border-r border-[#AFAFB6]/40 text-center min-w-20"
              >
                <div
                  className={`h-5 w-full rounded-md animate-pulse ${index % 2 !== 0 ? "bg-[#2C2C35]" : "bg-[#40404F]"}`}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric, index) => (
            <TableRow
              key={index}
              className={`border-l border-[#AFAFB6]/40 ${index % 2 === 0 ? "bg-[#2C2C35]" : "bg-[#40404F]"} ${metric.isLast ? "border-b border-b-white" : ""}`}
            >
              <TableCell className="border-r border-[#AFAFB6]/40">
                {fieldsMap[metric.name]}
              </TableCell>

              {cols.map((idx) => (
                <TableCell
                  key={idx}
                  className={`text-center ${idx !== metrics.length - 1 ? "border-r border-[#AFAFB6]/40" : ""}`}
                >
                  <div
                    className={`h-5 w-full rounded-md animate-pulse ${index % 2 !== 0 ? "bg-[#2C2C35]" : "bg-[#40404F]"}`}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableMain>
    </div>
  );
};

export default BalanceSheetTableSkeleton;
