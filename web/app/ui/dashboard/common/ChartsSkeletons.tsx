import { cn } from "@/app/lib/utils";

const AreaGraphSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-full mr-5 mb-4 rounded-xl h-[300px] bg-[#40404F] animate-pulse",
        className,
      )}
    />
  );
};

const PieGraphSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-[600px] rounded-full mr-5 mb-4 h-[300px] bg-[#40404F] animate-pulse",
        className,
      )}
    />
  );
};

export { AreaGraphSkeleton, PieGraphSkeleton };
