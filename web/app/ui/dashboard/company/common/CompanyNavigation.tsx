"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { companyIdType, navigationType } from "./types";

const CompanyNavigation = ({ companyId }: companyIdType) => {
  const pathName = usePathname();

  const pathLength = pathName.split("/").length;

  const navigation: navigationType[] = [
    {
      href: "",
      name: "Overview",
      isActive: pathName.includes("/dashboard/company") && pathLength === 4,
    },
    {
      href: "/key-metrics",
      name: "Key Metrics",
      isActive: pathName.includes("key-metrics"),
    },
    {
      href: "/financials",
      name: "Financials",
      isActive: pathName.includes("financials"),
    },
    {
      href: "/investor-relations",
      name: "Investor Relations",
      isActive: pathName.includes("investor-relations"),
    },
    {
      href: "/projections",
      name: "Forecast",
      isActive: pathName.includes("projections"),
    },
  ];

  return (
    <div className="overflow-hidden max-w-full px-4 min-h-fit mb-2.5">
      <div className="flex gap-2 items-center overflow-x-auto no-scrollbar">
        {navigation.map((nav, index: number) => (
          <Link
            href={`/dashboard/company/${companyId}${nav.href}`}
            key={index}
            className={`px-4 py-2 text-center rounded-md min-w-fit hover:bg-[#40404F] text-xs sm:text-sm ${nav.isActive ? "bg-[#40404F] font-semibold" : "bg-[#2C2C35] font-light"}`}
          >
            {nav.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompanyNavigation;
