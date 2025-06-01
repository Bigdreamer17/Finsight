import { AreaGraphSkeleton } from "../../common/ChartsSkeletons";

const ProjectionsSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="border-b border-r border-[#40404F] mr-5 pr-4 relative z-0">
        <AreaGraphSkeleton />

        <p className="text-center text-xs font-light">Year</p>
      </div>
    </div>
  );
};

export default ProjectionsSkeleton;
