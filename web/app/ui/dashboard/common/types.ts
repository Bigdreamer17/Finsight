import { ReactNode } from "react";

export type navigationType = {
  element: ReactNode;
  href: string;
  name?: string;
  isActive?: boolean;
};

export type searchInputProps = {
  className?: string;
  placeHolder?: string;
  defaultValue?: string;
  handleSearch: (term: string) => void;
};

export type dataType = {
  date: string;
  count: number;
};
