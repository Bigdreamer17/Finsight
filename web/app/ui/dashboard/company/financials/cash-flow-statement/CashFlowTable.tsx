"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/table";
import { fieldsMap } from "./data";
import { IoCloseOutline } from "react-icons/io5";
import { useAtom } from "jotai";
import { cashFlowMetricsAtom } from "@/app/store/financialsMetrics";
import { FaLock } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { tabelDataProps } from "../balance-sheet/types";

const CashFlowTable = ({ tableData, minYear }: tabelDataProps) => {
  const { data: session } = useSession();

  const [metrics, setMetrics] = useAtom(cashFlowMetricsAtom);

  const handleMetricDelete = (metric: string) => {
    setMetrics((prev) => prev.filter((m) => m.name != metric));
  };

  const minFiscalYear = tableData.length
    ? Math.min(
        ...tableData
          .map((r) => Number(r.fiscal_year))
          .filter((year): year is number => !isNaN(year)),
      )
    : null;
  const startYear =
    minFiscalYear && minFiscalYear !== minYear ? minFiscalYear - 1 : null;
  const yearGap = startYear === minYear ? minYear : `${startYear} - ${minYear}`;

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

              <button
                className="rounded-full hover:bg-white/10 hover:cursor-pointer"
                onClick={() => handleMetricDelete(metric.name)}
              >
                <IoCloseOutline size={16} />
              </button>
            </div>
          ))}
      </div>

      <Table className="w-full">
        <TableHeader className="bg-[#1C1C21] border-[#AFAFB6]/40 border-t border-l">
          <TableRow>
            <TableHead className="border-r border-[#AFAFB6]/40">
              Balance Sheet
            </TableHead>

            {tableData.map((data, index) => (
              <TableHead
                key={index}
                className="border-r border-[#AFAFB6]/40 text-center"
              >
                {data.fiscal_year} (ETB&apos;000)
              </TableHead>
            ))}

            {minYear !== null && !session?.user?.isUpgraded && (
              <TableHead className="border-r border-[#AFAFB6]/40 min-w-fit text-nowrap text-center">
                {yearGap}
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody className="[&_tr:last-child]:border-b-1 [&_tr:last-child]:border-l-1 text-sm">
          {metrics.map((metric, index) => (
            <TableRow
              key={index}
              className={`border-l border-[#AFAFB6]/40 ${index % 2 === 0 ? "bg-[#2C2C35]" : "bg-[#40404F]"} ${metric.isLast ? "border-b border-b-white" : ""}`}
            >
              <TableCell className="border-r border-[#AFAFB6]/40">
                {fieldsMap[metric.name]}
              </TableCell>

              {tableData.map((data, idx) => (
                <TableCell
                  key={idx}
                  className="border-r border-[#AFAFB6]/40 min-w-fit text-center"
                >
                  {typeof data[metric.name] === "number"
                    ? `${((data[metric.name] as number) / 1000).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} Birr`
                    : "-"}
                </TableCell>
              ))}

              {minYear !== null && !session?.user?.isUpgraded && (
                <TableCell className="border-r border-[#AFAFB6]/40">
                  <FaLock size={16} className="mx-auto" />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CashFlowTable;
