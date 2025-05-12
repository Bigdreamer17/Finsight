"use client";

import { cn } from "@/app/lib/utils";
import type { searchInputProps } from "./types";
import { type ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { FiSearch } from "react-icons/fi";

const SearchInput = ({
  className,
  placeHolder,
  defaultValue,
  handleSearch,
  onFocus,
  onBlur,
}: searchInputProps) => {
  const handleSearchDebounced = useDebouncedCallback(handleSearch, 250);

  return (
    <div className="relative z-0 w-full">
      <FiSearch
        size={18}
        className="absolute z-20 left-3 top-1/2 -translate-y-1/2"
        color="#AFAFB6"
      />

      <input
        type="text"
        placeholder={placeHolder ?? "Search"}
        className={cn(
          "bg-inherit rounded-full min-w-80 w-full pl-4 focus:outline-none focus-visible:outline-none focus:ring-0",
          className,
        )}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleSearchDebounced(e.target.value);
        }}
        defaultValue={defaultValue || ""}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default SearchInput;
