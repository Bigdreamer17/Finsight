"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { companyIdType, navigationType } from "../../common/types";

const FinancialsNavigation = ({ companyId }: companyIdType) => {
  const pathName = usePathname();

  const pathLength = pathName.split("/").length;

  const navigation: navigationType[] = [
    {
      href: "",
      name: "Income Statement",
      isActive: pathName.includes("financials") && pathLength === 5,
    },
    {
      href: "/balance-sheet",
      name: "Balance Sheet",
      isActive: pathName.includes("balance-sheet"),
    },
    {
      href: "/cash-flow-statement",
      name: "Cash Flow Statement",
      isActive: pathName.includes("cash-flow-statement"),
    },
    {
      href: "/kpis",
      name: "KPI's/Key Metrics",
      isActive: pathName.includes("kpis"),
    },
  ];

  return (
    <div className="overflow-hidden max-w-full">
      <div className="flex gap-2 items-center overflow-x-auto no-scrollbar">
        {navigation.map((nav, index: number) => (
          <Link
            href={`/dashboard/company/${companyId}/financials${nav.href}`}
            key={index}
            className={`px-4 py-2 text-center rounded-md min-w-fit hover:bg-[#40404F] text-xs sm:text-sm border border-[#40404F] ${nav.isActive ? "bg-[#40404F] font-semibold" : "bg-[#2C2C35] font-light"}`}
          >
            {nav.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FinancialsNavigation;
