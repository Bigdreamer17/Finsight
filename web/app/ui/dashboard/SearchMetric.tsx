"use client";

import { searchParamOption } from "@/app/lib/search-params";
import { useQueryStates } from "nuqs";
import { searchParams } from "./search-params";
import SearchInput from "./common/SearchInput";
import { searchProps } from "./common/topbar/types";

const SearchMetric = ({ paginationQuery }: searchProps) => {
  const [{ metric }, setParams] = useQueryStates(
    searchParams,
    searchParamOption,
  );

  const handleSearch = (term: string) => {
    setParams((prev) => ({ ...prev, metric: term }));

    if (paginationQuery) {
      setParams((prev) => ({ ...prev, [paginationQuery]: 1 }));
    }
  };

  return (
    <div className="relative z-0 grow flex-1">
      <SearchInput
        defaultValue={metric}
        handleSearch={handleSearch}
        placeHolder="Select and search metrics"
        className="border border-transparent focus:border-[#AFAFB6] bg-[#1C1C21] placeholder:text-[#AFAFB6] text-white text-sm py-2 pr-4 pl-10 transform transition duration-200 ease-in-out"
      />
    </div>
  );
};

export default SearchMetric;
