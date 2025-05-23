import SearchMetric from "./SearchMetric";

const CashFlowSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <SearchMetric />
      <KpisTableSkeleton />
    </div>
  );
};

export default CashFlowSkeleton;
