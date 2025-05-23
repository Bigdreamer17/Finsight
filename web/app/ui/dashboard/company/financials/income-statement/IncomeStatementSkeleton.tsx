import IncomeStatementTableSkeleton from "./IncomeStatementTableSkeleton";
import SearchMetric from "./SearchMetric";

const IncomeStatementSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <SearchMetric />
      <IncomeStatementTableSkeleton />
    </div>
  );
};

export default IncomeStatementSkeleton;
