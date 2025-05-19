import BODTableSkeleton from "./BODTableSkeleton";
import ExecutiveTableSkeleton from "./ExecutiveTableSkeleton";
import ShareholderInfoSkeleton from "./ShareholderInfoSkeleton";

const InvestorRelationsSkeleton = () => {
  return (
    <div className="mt-5 flex flex-col gap-3">
      <h3 className="text-xl font-medium px-4">
        Ownership structure of the company
      </h3>

      <div className="rounded-lg bg-[#2C2C35] px-4 pt-4 pb-10 flex flex-col gap-4">
        <h4 className="text-xl font-medium">Report</h4>

        <div className="flex flex-col gap-2">
          <h5 className="font-light">Board of Directors:</h5>

          <BODTableSkeleton />
        </div>

        <div className="flex flex-col gap-2">
          <h5 className="font-light">Executive Managment:</h5>

          <ExecutiveTableSkeleton />
        </div>

        <h5 className="font-light">Shareholder information</h5>

        <ShareholderInfoSkeleton />
      </div>
    </div>
  );
};

export default InvestorRelationsSkeleton;
