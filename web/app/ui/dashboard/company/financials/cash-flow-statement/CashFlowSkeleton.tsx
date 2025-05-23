import CashFlowTableSkeleton from "./CashFlowTableSkeleton";
import SearchMetric from "./SearchMetric";

const CashFlowSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <SearchMetric />
      <CashFlowTableSkeleton />
    </div>
  );
};

export default CashFlowSkeleton;
