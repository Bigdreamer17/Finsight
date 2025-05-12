import { companyIdType } from "../../common/types";

export type IncomeStatementProps = {
  metric: string;
} & companyIdType;

export type incomeStatementType = {
  [key: string]: string | number;
};

export type tabelDataProps = {
  tableData: incomeStatementType[];
};

export type searchProps = {
  paginationQuery?: string;
};
