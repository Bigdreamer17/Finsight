import { AreaGraphSkeleton } from "../../common/ChartsSkeletons";
import DebtToEquityRationChartSkeleton from "./DebtToEquityRationChartSkeleton";
import PerformanceIndicatorsSkeleton from "./PerformanceIndicatorsSkeleton";
import ROICalculatorSkeleton from "./ROICalculatorSkeleton";

const KeyMetricsSkeleton = () => {
  return (
    <div className="mt-5 px-4 flex flex-col gap-3 pb-5">
      <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col gap-4">
        <h3 className="text-xl font-medium flex gap-3 items-stretch flex-wrap">
          Financial health of company:
          <span className="w-40 rounded-md bg-[#40404F] animate-pulse"></span>
        </h3>

        <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col md:flex-row gap-4">
          <AreaGraphSkeleton className="md:basis-1/2" />

          <AreaGraphSkeleton className="md:basis-1/2" />
        </div>

        <div className="flex flex-col gap-2">
          <p className="flex items-stretch flex-wrap font-medium gap-2">
            Growth compared to others in the industry:
            <span className="w-40 rounded-md bg-[#40404F] animate-pulse"></span>
          </p>

          <p className="flex items-stretch flex-wrap font-medium gap-2">
            Industry average number:
            <span className="w-40 rounded-md bg-[#40404F] animate-pulse"></span>
          </p>

          <p className="flex items-stretch flex-wrap font-medium gap-2">
            Growth ranking:
            <span className="w-40 rounded-md bg-[#40404F] animate-pulse"></span>
          </p>

          <p className="flex items-stretch flex-wrap font-medium gap-2">
            Investment potential:
            <span className="w-40 rounded-md bg-[#40404F] animate-pulse"></span>
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col gap-4">
        <h3 className="text-xl font-medium flex">Performance indicators:</h3>

        <div className="flex flex-col md:items-center md:flex-row pb-6 gap-4">
          <PerformanceIndicatorsSkeleton />

          <DebtToEquityRationChartSkeleton />
        </div>
      </div>

      <ROICalculatorSkeleton />
    </div>
  );
};

export default KeyMetricsSkeleton;
