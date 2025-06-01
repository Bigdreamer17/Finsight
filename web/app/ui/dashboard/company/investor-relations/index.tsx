import ShareholderInfo from "./ShareholderInfo";
import ExecutiveTable from "./ExecutiveTable";
import BODTable from "./BODTable";
import { format } from "date-fns";
import type {
  bodTableData as bodTabelDataType,
  execTabelDataType,
  investorRelationProps,
} from "./types";
import {
  fetchBodTableData,
  fetchExexTableData,
  fetchInfo,
} from "@/app/lib/fetchs/get-investor-relations";

const InvestorRelations = async ({
  companyId,
  sortMetric,
  sortParam,
  table,
}: investorRelationProps) => {
  const [bodTableData, execTableData, information]: [
    bodTabelDataType[],
    execTabelDataType[],
    string[],
  ] = await Promise.all([
    fetchBodTableData({ companyId, sortMetric, sortParam, table }),
    fetchExexTableData({ companyId, sortParam, sortMetric, table }),
    fetchInfo({ companyId }),
  ]);

  return (
    <div className="mt-5 flex flex-col gap-3">
      <h3 className="text-xl font-medium px-4">
        Ownership structure of the company
      </h3>

      <div className="rounded-lg bg-[#2C2C35] px-4 pt-4 pb-10 flex flex-col gap-4">
        <h4 className="text-xl font-medium">Report</h4>

        <div className="flex flex-col gap-2">
          <h5 className="font-light">Board of Directors:</h5>

          <BODTable tableData={bodTableData ?? []} />
        </div>

        <div className="flex flex-col gap-2">
          <h5 className="font-light">Executive Managment:</h5>

          <ExecutiveTable tableData={execTableData ?? []} />
        </div>

        {information && information.length > 0 && (
          <h5 className="font-light">Shareholder information</h5>
        )}

        <ShareholderInfo information={information ?? []} />
      </div>
    </div>
  );
};

export default InvestorRelations;
