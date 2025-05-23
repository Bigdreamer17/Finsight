import { companyIdType } from "../common/types";

export type financialsProps = {
  metric?: string;
} & companyIdType;

export type financialsType = {
  [key: string]: string | number | null;
};

export type tabelDataProps = {
  tableData: financialsType[];
};

export type searchProps = {
  paginationQuery?: string;
};
