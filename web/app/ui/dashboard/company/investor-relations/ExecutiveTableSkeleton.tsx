import { RiArrowUpDownLine } from "react-icons/ri";
import { execColumns as columns } from "./data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/table";

const ExecutiveTableSkeleton = () => {
  const rows = [1, 2, 3, 4, 5, 6];

  return (
    <Table className="table-fixed w-full">
      <TableHeader className="bg-[#1C1C21] border-[#AFAFB6]/40 border-t border-l text-xs">
        <TableRow>
          {columns.map((name, index) => (
            <TableHead key={index} className="border-r border-[#AFAFB6]/40">
              <div className="flex items-center gap-3 hover:cursor-pointer w-full focus:outline-none">
                <span>{name}</span>

                <div className="flex justify-center items-center hover:cursor-pointer">
                  <RiArrowUpDownLine size={17} />
                </div>
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className="[&_tr:last-child]:border-b-1 [&_tr:last-child]:border-l-1">
        {Array.from(rows, (_, index) => (
          <TableRow
            key={index}
            className={`border-l border-[#AFAFB6]/40 ${index % 2 === 0 ? "bg-[#2C2C35]" : "bg-[#40404F]"}`}
          >
            {columns.map((_, idx) => (
              <TableCell
                key={idx}
                className={`border-r border-[#AFAFB6]/40 ${idx !== columns.length - 1 ? "border-r border-[#AFAFB6]/40" : ""}`}
              >
                <div
                  className={`h-6 w-32 rounded-md animate-pulse bg-white/20 ${index % 2 !== 0 ? "bg-[#2C2C35]" : "bg-[#40404F]"}`}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExecutiveTableSkeleton;
