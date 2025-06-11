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
import { kpisGraphAtom, kpisMetricsAtom } from "@/app/store/financialsMetrics";
import { tabelDataProps } from "../balance-sheet/types";
import EmptyTable from "../../../common/EmptyTable";
import { colors } from "../../../common/data";
import { checkIsActiveMetric } from "../../../utils";
import { Checkbox } from "@/app/ui/checkbox";

const CashFlowTable = ({ tableData }: tabelDataProps) => {
  const [metrics, setMetrics] = useAtom(kpisMetricsAtom);
  const [kpisMetrics, setKpisMetrics] = useAtom(kpisGraphAtom);

  const handleMetricDelete = (metric: string) => {
    setMetrics((prev) => prev.filter((m) => m.name != metric));
  };

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

      {tableData.length > 0 ? (
        <Table className="w-full">
          <TableHeader className="bg-[#1C1C21] border-[#AFAFB6]/40 border-t border-l">
            <TableRow>
              <TableHead className="border-r border-[#AFAFB6]/40">
                Kpi&apos;s
              </TableHead>

              {tableData.map((data, index) => (
                <TableHead
                  key={index}
                  className="border-r border-[#AFAFB6]/40 text-center"
                >
                  {data.fiscal_year}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="[&_tr:last-child]:border-b-1 [&_tr:last-child]:border-l-1 text-sm">
            {metrics.map((metric, index) => {
              const isChecked = checkIsActiveMetric(metric.name, kpisMetrics);
              const activeColor = isChecked ? colors[index] : "";

              return (
                <TableRow
                  key={index}
                  className={`border-l border-[#AFAFB6]/40 ${index % 2 === 0 ? "bg-[#2C2C35]" : "bg-[#40404F]"} ${metric.isLast ? "border-b border-b-white" : ""}`}
                >
                  <TableCell className="border-r border-[#AFAFB6]/40 text-nowrap flex items-center gap-2 group-hover:underline">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        return checked
                          ? setKpisMetrics((prev) => [...prev, metric])
                          : setKpisMetrics((prev) =>
                              prev.filter(
                                (value) => value.name !== metric.name,
                              ),
                            );
                      }}
                      style={
                        isChecked
                          ? {
                              backgroundColor: activeColor,
                              borderColor: activeColor,
                            }
                          : undefined
                      }
                      className="hover:cursor-pointer"
                    />
                    {fieldsMap[metric.name]}
                  </TableCell>

                  {tableData.map((data, idx) => (
                    <TableCell
                      key={idx}
                      className="border-r border-[#AFAFB6]/40 text-nowrap min-w-fit text-center"
                    >
                      {data[metric.name] ? `${data[metric.name]}` : "-"}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <EmptyTable />
      )}
    </div>
  );
};

export default CashFlowTable;
