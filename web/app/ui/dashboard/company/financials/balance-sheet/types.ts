import { financialsType } from "../types";

export type balanceSheetType = {
  reports: financialsType[];
  min_fiscal_year: number;
};

export type tabelDataProps = {
  tableData: financialsType[];
  minYear: number | null;
};
