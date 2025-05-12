"use client";

import { FaCheck } from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import { servicesMap } from "./data";
import { spaceGrotesk } from "@/app/fonts";
import type { servicesType } from "./types";

const CompairPlans = () => {
  const tableHeaders = ["Compare Plans", "Free", "Pro"];

  const services: servicesType[] = [
    {
      service: "Monthly AI Copilot Prompts",
      free: 10,
      pro: 500,
    },
    {
      service: "Stocks, ETFs & Funds Coverage",
      free: "Global Markets (100,000+ companies)",
      pro: "Global Markets (100,000+ companies)",
    },
    {
      service: "Segments & KPIs Coverage",
      free: "2,000+ companies",
      pro: "2,000+ companies",
    },
    {
      service: "Financials & Ratios - Annual Periods (Table)",
      free: 5,
      pro: 10,
    },
    {
      service: "Financials & Ratios - Quarterly Periods (Table)",
      free: 6,
      pro: 12,
    },
    {
      service: "Segments & KPIs - Annual Periods",
      free: 2,
      pro: 12,
    },
    {
      service: "Investor Relations (Earnings Calls, Transcripts, Slides)",
      free: 1,
      pro: "Unlimited",
    },
    {
      service: "Custom Metrics",
      free: "Limited",
      pro: <FaCheck size={14} className="mx-auto" />,
    },
    {
      service: "Premium Support",
      free: "-",
      pro: <FaCheck size={14} className="mx-auto" />,
    },
    {
      service: "Filings",
      free: 1,
      pro: "Unlimited",
    },
  ];

  return (
    <div className="bg-[#f9f8f6] px-5">
      <div className="bg-[#f9f8f6] px-5 py-20 border-x border-[#AFAFB6]/40">
        <Table>
          <TableHeader
            className={`border-[#AFAFB6]/40 text-2xl font-semibold border-b ${spaceGrotesk.className}`}
          >
            <TableRow className="py-5">
              {tableHeaders.map((header, index) => (
                <TableHead
                  key={index}
                  className={`
                 ${
                   index !== tableHeaders.length - 1
                     ? "border-r border-[#AFAFB6]/40"
                     : ""
                 }
                 ${index === 0 ? "w-3/5" : "text-center max-w-fit"}
                `}
                >
                  <span>{header}</span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {services.map((service, index) => {
              return (
                <TableRow
                  key={index}
                  className={`
                 ${
                   index !== services.length - 1
                     ? "border-b border-[#AFAFB6]/40"
                     : ""
                 } py-5
                `}
                >
                  {tableHeaders.map((header, idx) => {
                    const serviceKey = servicesMap[header];
                    const data = service[serviceKey as keyof typeof service];

                    return (
                      <TableCell
                        key={idx}
                        className={`font-medium ${idx !== tableHeaders.length - 1 ? "border-r border-[#AFAFB6]/40" : ""} ${idx === 0 ? "w-3/5" : "text-center max-w-fit"}`}
                      >
                        <span>{data ?? "-"}</span>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompairPlans;
