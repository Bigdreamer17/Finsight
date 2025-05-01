"use client";

import { searchParamOption } from "@/app/lib/search-params";
import SearchInput from "../SearchInput";
import { searchParams } from "../../search-params";
import { useQueryStates } from "nuqs";
import type { searchProps } from "./types";

const Search = ({ paginationQuery }: searchProps) => {
  const [{ company }, setParams] = useQueryStates(
    searchParams,
    searchParamOption,
  );

  const handleSearch = (term: string) => {
    setParams((prev) => ({ ...prev, company: term }));

    if (paginationQuery) {
      setParams((prev) => ({ ...prev, [paginationQuery]: 1 }));
    }
  };

  return (
    <div className="relative w-full grow flex-1">
      <SearchInput
        defaultValue={company}
        handleSearch={handleSearch}
        placeHolder="Search for companies"
        className="border border-[#AFAFB6] focus:border-[#F2C785] bg-[#2C2C35] placeholder:text-[#AFAFB6] text-white py-2 pr-4 pl-10 transform transition duration-200 ease-in-out"
      />
    </div>
  );
};

export default Search;
