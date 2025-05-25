import { GoDotFill } from "react-icons/go";
import { PieGraphSkeleton } from "../../common/ChartsSkeletons";

const DebtToEquityRationChartSkeleton = () => {
  return (
    <div className="flex md:flex-col gap-3 items-center w-full">
      <div className="flex flex-col md:flex-row items-center gap-5">
        <div className="flex items-center gap-2">
          <GoDotFill size={20} color={"#0BD28B"} />

          <span>Equity</span>
        </div>
        <div className="flex items-center gap-2">
          <GoDotFill size={20} color={"#EF476F"} />

          <span>Debt</span>
        </div>
      </div>

      <PieGraphSkeleton className="w-[300px]" />
    </div>
  );
};

export default DebtToEquityRationChartSkeleton;
