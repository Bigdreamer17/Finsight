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

export { AreaGraphSkeleton };
