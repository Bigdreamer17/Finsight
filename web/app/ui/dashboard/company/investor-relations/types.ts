import { companyIdType } from "../common/types";

export type bodTableProps = {
  tableData: { [key: string]: string }[] | [];
};

export type execTableProps = {
  tableData: { [key: string]: string }[] | [];
};

export type bodTableData = {
  name: string;
  title: string;
  appointmentDate: string;
};

export type execTabelDataType = {
  name: string;
  position: string;
  appointmentDate: string;
};

export type investorRelationProps = {
  sortMetric: string;
  sortParam: string;
  table: string;
} & companyIdType;

export type shareholderInfoProps = {
  information: string[];
};
