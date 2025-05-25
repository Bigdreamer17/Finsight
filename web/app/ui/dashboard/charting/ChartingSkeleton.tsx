import { AreaGraphSkeleton } from "../common/ChartsSkeletons";

const ChartingSkeleton = () => {
  return (
    <div className="mt-5 px-4 flex flex-col gap-3 pb-5">
      <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col gap-4">
        <h3 className="text-xl font-medium flex flex-wrap">Charts</h3>

        <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col md:flex-row gap-4">
          <AreaGraphSkeleton className="md:basis-1/2" />
          <AreaGraphSkeleton className="md:basis-1/2" />
        </div>

        <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col md:flex-row gap-4">
          <AreaGraphSkeleton className="md:basis-1/2" />
          <AreaGraphSkeleton className="md:basis-1/2" />
        </div>

        <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col md:flex-row gap-4">
          <AreaGraphSkeleton className="md:basis-[48%]" />
        </div>
      </div>
    </div>
  );
};

export default ChartingSkeleton;
