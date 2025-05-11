"use client";

import Image from "next/image";
import { searchParamOption } from "@/app/lib/search-params";
import SearchInput from "../SearchInput";
import { searchParams } from "../../search-params";
import { useQueryStates } from "nuqs";
import type { companyType, searchProps } from "./types";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { handleClickOutside } from "@/app/lib/utils/handleClickOutside";

const Search = ({ paginationQuery, companies }: searchProps) => {
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
      comp.name.toLowerCase().includes(company),
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
    <div ref={ref} className="relative w-full grow flex-1">
      <SearchInput
        onFocus={() => setIsFocused(true)}
        defaultValue={company}
        handleSearch={handleSearch}
        placeHolder="Search for companies"
        className="border border-[#AFAFB6] focus:border-[#F2C785] bg-[#2C2C35] peer placeholder:text-[#AFAFB6] text-white py-2 pr-4 pl-10 transform transition duration-200 ease-in-out"
      />

      {isFocused && companiesFinal.length !== 0 && (
        <div className="absolute border-[#F2C785] p-1 z-20 top-full left-0 right-0 mt-2 flex flex-col gap-1 rounded-lg bg-[#2C2C35]">
          {companiesFinal.map((company, index) => (
            <Link
              key={index}
              href={`/dashboard/company/${company.companyId}`}
              onClick={() => setIsFocused(false)}
              className="flex items-center p-2 rounded-md gap-2.5 hover:bg-[#40404F]"
            >
              <Image
                src={company.imageUrl}
                alt="company image"
                height={26}
                width={26}
                className="object-cover rounded-md"
              />

              <div className="flex flex-col self-start">
                <h1 className="font-medium">{company.name}</h1>

                {company?.stockName !== null &&
                  company?.stockName !== "" &&
                  typeof company?.stockName === "string" && (
                    <h2 className="text-xs font-light">{company.stockName}</h2>
                  )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
