"use client";

import Image from "next/image";
import { searchParamOption } from "@/app/lib/search-params";
import SearchInput from "../SearchInput";
import { searchParams } from "../../search-params";
import { useQueryStates } from "nuqs";
import type { searchProps } from "./types";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { handleClickOutside } from "@/app/lib/utils/handleClickOutside";
import { companyType } from "../../company/common/types";
import { usePathname } from "next/navigation";
import { p } from "framer-motion/client";

const Search = ({ paginationQuery, companies }: searchProps) => {
  const pathName = usePathname();

  const isChartingPage = pathName.includes("charting");

  const [isFocused, setIsFocused] = useState(false);
  const [companiesFinal, setCompaniesFinal] =
    useState<companyType[]>(companies);
  const ref = useRef<HTMLDivElement>(null);

  const [{ company }, setParams] = useQueryStates(
    searchParams,
    searchParamOption,
  );

  useEffect(() => {
    const filteredCompanies = companies.filter((comp) =>
      comp?.name?.toLowerCase().includes(company),
    );
    setCompaniesFinal(filteredCompanies);
  }, [company, companies]);

  useEffect(() => {
    function handleClickEvent(event: MouseEvent) {
      handleClickOutside(event, ref, handleClose);
    }

    document.addEventListener("mousedown", handleClickEvent);

    return () => {
      document.removeEventListener("mousedown", handleClickEvent);
    };
  }, []);

  const handleClose = () => {
    setIsFocused(false);
  };

  const handleSearch = (term: string) => {
    setParams((prev) => ({ ...prev, company: term }));

    if (paginationQuery) {
      setParams((prev) => ({ ...prev, [paginationQuery]: 1 }));
    }
  };

  return (
    <div ref={ref} className="relative w-full grow flex-1 z-50">
      <SearchInput
        onFocus={() => setIsFocused(true)}
        defaultValue={company}
        handleSearch={handleSearch}
        placeHolder="Search for companies"
        className="border border-[#AFAFB6] focus:border-[#F2C785] bg-[#2C2C35] peer placeholder:text-[#AFAFB6] text-white py-2 pr-4 pl-10 transform transition duration-200 ease-in-out"
      />

      {isFocused && (
        <div className="absolute border-[#F2C785] p-1 z-50 top-full left-0 right-0 mt-2 flex flex-col gap-1 rounded-lg bg-[#2C2C35]">
          {companiesFinal.length > 0 ? (
            companiesFinal.map((company, index) => (
              <Link
                key={index}
                href={`/dashboard/${isChartingPage ? "charting" : "company"}/${company.id}`}
                onClick={() => setIsFocused(false)}
                className="flex items-center p-2 rounded-md gap-2.5 hover:bg-[#40404F]"
              >
                <Image
                  src={
                    "https://media.glassdoor.com/sql/525842/dashen-bank-squarelogo-1461672481507.png"
                  }
                  alt="company image"
                  height={26}
                  width={26}
                  className="object-cover rounded-md"
                />

                <div className="flex flex-col self-start">
                  <h1 className="font-medium">{company.name}</h1>

                  {company?.stock_name !== null &&
                    company?.stock_name !== "" &&
                    typeof company?.stock_name === "string" && (
                      <h2 className="text-xs font-light">
                        {company.stock_name}
                      </h2>
                    )}
                </div>
              </Link>
            ))
          ) : (
            <p className="p-2 text-sm">
              No company mathces found. Try adjusting your search
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
