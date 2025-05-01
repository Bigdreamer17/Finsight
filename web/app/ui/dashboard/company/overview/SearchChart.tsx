"use client";

import { searchParamOption } from "@/app/lib/search-params";
import { useQueryStates } from "nuqs";
import { searchParams } from "../../search-params";
import SearchInput from "../../common/SearchInput";

const SearchChart = () => {
  const [{ chart }, setParams] = useQueryStates(
    searchParams,
    searchParamOption,
  );

  const handleSearch = (term: string) => {
    setParams((prev) => ({ ...prev, chart: term }));
  };

  return (
    <div className="relative z-0 grow flex-1">
      <SearchInput
        defaultValue={chart}
        handleSearch={handleSearch}
        placeHolder="Search and add Chart"
        className="border border-transparent focus:border-[#AFAFB6] bg-[#1C1C21] placeholder:text-[#AFAFB6] text-white text-sm py-2 pr-4 pl-10 transform transition duration-200 ease-in-out"
      />
    </div>
  );
};

export default SearchChart;
