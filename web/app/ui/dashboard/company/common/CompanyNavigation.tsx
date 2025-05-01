"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { navigationType } from "./types";

const CompanyNavigation = () => {
  const pathName = usePathname();

  const pathLength = pathName.split("/").length;

  const navigation: navigationType[] = [
    {
      href: "",
      name: "Overview",
      isActive: pathLength === 4,
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
      href: "/industry-news",
      name: "Industry News",
      isActive: pathName.includes("industry-news"),
    },
  ];

  return (
    <div className="overflow-hidden max-w-full px-4">
      <div className="flex gap-2 items-center overflow-x-auto no-scrollbar">
        {navigation.map((nav, index: number) => (
          <Link
            href={`${pathName}${nav.href}`}
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
