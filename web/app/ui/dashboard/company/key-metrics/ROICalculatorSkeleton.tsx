const ROICalculatorSkeleton = () => {
  return (
    <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col gap-4">
      <h3 className="text-xl font-medium flex">ROI calculator:</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2 sm:col-span-2 md:col-auto">
          <span className="ml-5">Enter amount:</span>

          <div className="rounded-full w-full animate-pulse pl-4 focus:outline-none focus-visible:outline-none focus:ring-0 bg-[#40404F] placeholder:text-[#AFAFB6] text-white py-2 px-4">
            <p className="h-5"></p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="ml-5">Return after 1 YR || ROI %</span>

          <div className="rounded-full w-full animate-pulse pl-4 focus:outline-none focus-visible:outline-none focus:ring-0 bg-[#40404F] placeholder:text-[#AFAFB6] text-white py-2 px-4">
            <p className="h-5"></p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="ml-5">Return after 5 YR || ROI %</span>

          <div className="rounded-full w-full animate-pulse pl-4 focus:outline-none focus-visible:outline-none focus:ring-0 bg-[#40404F] placeholder:text-[#AFAFB6] text-white py-2 px-4">
            <p className="h-5"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculatorSkeleton;
