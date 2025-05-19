import CompanyBreakDownSkeleton from "./CompanyBreakDownSkeleton";
import CompanyChartSkeleton from "./CompanyChartSkeleton";

const CompanyOverviewSkeleton = () => {
  return (
    <div className="flex px-4 flex-col gap-3 xl:flex-row items-stretch mt-5">
      <CompanyBreakDownSkeleton />
      <CompanyChartSkeleton />
    </div>
  );
};

export default CompanyOverviewSkeleton;
