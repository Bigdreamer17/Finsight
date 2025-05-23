import BalanceSheetTableSkeleton from "./BalanceSheetTableSkeleton";
import SearchMetric from "./SearchMetric";

const BalanceSheetSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <SearchMetric />
      <BalanceSheetTableSkeleton />
    </div>
  );
};

export default BalanceSheetSkeleton;
