"use client";

import { searchParamOption } from "@/app/lib/search-params";
import { useQueryStates } from "nuqs";
import { RiArrowUpDownLine } from "react-icons/ri";
import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";
import { searchParams } from "../../search-params";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/table";
import { bodColumMap, bodColumn as columns } from "./data";
import type { bodTableProps } from "./types";

const BODTable = ({ tableData }: bodTableProps) => {
  const [{ sortMetric, sortParam, table }, setParams] = useQueryStates(
    searchParams,
    searchParamOption,
  );

  const handleSortClick = (param: string) => {
    const newMetric =
      sortMetric === "Desc" && param === sortParam ? "Asc" : "Desc";

    setParams((prev) => ({
      ...prev,
      sortMetric: newMetric,
      sortParam: param,
      table: "bod",
    }));
  };

  return (
    <Table className="table-fixed w-full">
      <TableHeader className="bg-[#1C1C21] border-[#AFAFB6]/40 border-t border-l text-xs">
        <TableRow>
          {columns.map((name, index) => (
            <TableHead key={index} className="border-r border-[#AFAFB6]/40">
              <button
                className="flex items-center gap-3 hover:cursor-pointer w-full focus:outline-none"
                onClick={() => handleSortClick(bodColumMap[name])}
              >
                <span>{name}</span>

                <div className="flex justify-center items-center hover:cursor-pointer">
                  <RiArrowUpDownLine
                    size={17}
                    className={
                      sortMetric !== "" &&
                      sortParam === bodColumMap[name] &&
                      table === "bod"
                        ? "hidden"
                        : "p-0"
                    }
                  />

                  <HiArrowNarrowUp
                    size={17}
                    className={
                      sortMetric === "Desc" ||
                      sortParam !== bodColumMap[name] ||
                      table !== "bod"
                        ? "hidden"
                        : "p-0"
                    }
                  />

                  <HiArrowNarrowDown
                    size={17}
                    className={
                      sortMetric === "Asc" ||
                      sortParam !== bodColumMap[name] ||
                      table !== "bod"
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

      <TableBody className="[&_tr:last-child]:border-b-1 [&_tr:last-child]:border-l-1">
        {tableData.map((data, index) => (
          <TableRow
            key={index}
            className={`border-l border-[#AFAFB6]/40 ${index % 2 === 0 ? "bg-[#2C2C35]" : "bg-[#40404F]"}`}
          >
            {Object.values(data).map((d, idx) => (
              <TableCell key={idx} className="border-r border-[#AFAFB6]/40">
                {d}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BODTable;
