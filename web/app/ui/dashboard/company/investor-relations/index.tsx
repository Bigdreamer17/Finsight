import ShareholderInfo from "./ShareholderInfo";
import ExecutiveTable from "./ExecutiveTable";
import BODTable from "./BODTable";
import { format } from "date-fns";
import type {
  bodTableData as bodTabelDataType,
  execTabelDataType,
  investorRelationProps,
} from "./types";

const InvestorRelations = async ({
  companyId,
  sortMetric,
  sortParam,
  table,
}: investorRelationProps) => {
  interface comp {
    bodTabelData: bodTabelDataType[];
    execTableData: execTabelDataType[];
    information: string[];
  }
  const companyRelations: { [key: string]: comp } = {
    "123": {
      bodTabelData: [
        {
          name: "Abebe Chala",
          title: "Staff",
          appointmentDate: format(Date.now(), "MMMM dd, yyyy"),
        },
        {
          name: "Yoseph Ephrem",
          title: "CEO",
          appointmentDate: format(Date.now(), "MMMM dd, yyyy"),
        },
        {
          name: "Estifanos F/Mariam",
          title: "CEO",
          appointmentDate: format(Date.now(), "MMMM dd, yyyy"),
        },
        {
          name: "Abebe Chala",
          title: "CEO",
          appointmentDate: format(Date.now(), "MMMM dd, yyyy"),
        },
        {
          name: "Abebe Chala",
          title: "CEO",
          appointmentDate: format(Date.now(), "MMMM dd, yyyy"),
        },
      ],
      execTableData: [
        {
          name: "Abebe Chala",
          position: "Staff",
          appointmentDate: format(Date.now(), "MMMM dd, yyyy"),
        },
        {
          name: "Yoseph Ephrem",
          position: "CEO",
          appointmentDate: format(Date.now(), "MMMM dd, yyyy"),
        },
        {
          name: "Estifanos F/Mariam",
          position: "CEO",
          appointmentDate: format(Date.now(), "MMMM dd, yyyy"),
        },
        {
          name: "Abebe Chala",
          position: "CEO",
          appointmentDate: format(Date.now(), "MMMM dd, yyyy"),
        },
        {
          name: "Abebe Chala",
          position: "CEO",
          appointmentDate: format(Date.now(), "MMMM dd, yyyy"),
        },
      ],

      information: [
        `Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eum
      nesciunt natus voluptate laborum nobis illum ducimus suscipit! Natus
      cumque aspernatur ex perspiciatis nobis asperiores nulla eum
      voluptates voluptatum explicabo?`,
        `Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eum
      nesciunt natus voluptate laborum nobis illum ducimus suscipit! Natus
      cumque aspernatur ex perspiciatis nobis asperiores nulla eum
      voluptates voluptatum explicabo?`,
      ],
    },
  };

  const companyData = companyRelations[companyId];

  return (
    <div className="mt-5 flex flex-col gap-3">
      <h3 className="text-xl font-medium px-4">
        Ownership structure of the company
      </h3>

      <div className="rounded-lg bg-[#2C2C35] px-4 pt-4 pb-10 flex flex-col gap-4">
        <h4 className="text-xl font-medium">Report</h4>

        <div className="flex flex-col gap-2">
          <h5 className="font-light">Board of Directors:</h5>

          <BODTable tableData={companyData?.bodTabelData ?? []} />
        </div>

        <div className="flex flex-col gap-2">
          <h5 className="font-light">Executive Managment:</h5>

          <ExecutiveTable tableData={companyData?.execTableData ?? []} />
        </div>

        <h5 className="font-light">Shareholder information</h5>

        <ShareholderInfo information={companyData?.information ?? []} />
      </div>
    </div>
  );
};

export default InvestorRelations;
