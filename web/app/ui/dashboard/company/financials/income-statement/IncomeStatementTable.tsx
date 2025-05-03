"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/table";
import type { tabelDataProps } from "./types";
import { fieldsMap } from "./data";
import { IoCloseOutline } from "react-icons/io5";
import { useAtom } from "jotai";
import { incomeStatementMetricsAtom } from "@/app/store/financialsMetrics";
import { FaLock } from "react-icons/fa";

const IncomeStatementTable = ({ tableData }: tabelDataProps) => {
  const [metrics, setMetrics] = useAtom(incomeStatementMetricsAtom);

  const handleMetricDelete = (metric: string) => {
    setMetrics((prev) => prev.filter((m) => m.name != metric));
  };

  return (
    <div className="flex flex-col flex-1 gap-3">
      <div className="flex items-center gap-3 flex-wrap">
        {metrics.map((metric, index) => (
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

      <Table className="sm:table-fixed w-full">
        <TableHeader className="bg-[#1C1C21] border-[#AFAFB6]/40 border-t border-l">
          <TableRow>
            <TableHead className="border-r border-[#AFAFB6]/40">
              Income Statement
            </TableHead>

            {tableData.map((data, index) => (
              <TableHead key={index} className="border-r border-[#AFAFB6]/40">
                {data.year}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="[&_tr:last-child]:border-b-1 [&_tr:last-child]:border-l-1 text-sm">
          {metrics.map((metric, index) => (
            <TableRow
              key={index}
              className={`border-l border-[#AFAFB6]/40 ${index % 2 === 0 ? "bg-[#2C2C35]" : "bg-[#40404F]"}`}
            >
              <TableCell className="border-r border-[#AFAFB6]/40">
                {metric.name}
              </TableCell>

              {tableData.map((data, idx) => (
                <TableCell
                  key={idx}
                  className="border-r border-[#AFAFB6]/40 min-w-fit"
                >
                  {metric.isPaidFeature ? (
                    <FaLock size={16} />
                  ) : (
                    (data[fieldsMap[metric.name]] ?? "-")
                  )}
                  {/* {data[fieldsMap[m.name]] ?? "-"} */}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IncomeStatementTable;
