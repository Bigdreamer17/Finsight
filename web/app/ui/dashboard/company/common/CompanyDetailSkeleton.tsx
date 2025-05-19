import { CgTranscript } from "react-icons/cg";

const CompanyDetailSkeleton = () => {
  return (
    <div className="px-4 flex flex-col sm:flex-row items-stretch gap-3 mb-2.5">
      <div className="p-2 rounded-lg bg-[#2C2C35] grow">
        <div className="flex items-center gap-2.5">
          <div className="size-[46px] rounded-md bg-[#40404F] animate-pulse" />

          <div className="flex flex-col gap-2 self-start">
            <h1 className="font-semibold rounded-md text-xl sm:text-2xl h-5 w-32 bg-[#40404F] animate-pulse" />

            <h2 className="text-sm font-light rounded-md h-4 w-10 bg-[#40404F] animate-pulse" />
          </div>
        </div>
      </div>
      <div className="p-2 rounded-lg flex items-center bg-[#2C2C35] shrink-0 basis-1/3 justify-between">
        <p className="font-semibold h-5 w-10 bg-[#40404F] animate-pulse" />

        <div className="p-1 rounded-md">
          <CgTranscript size={20} />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailSkeleton;
