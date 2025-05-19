import { BsInfoCircleFill } from "react-icons/bs";

const ShareholderInfoSkeleton = () => {
  const info = [1, 2, 3];
  return (
    <>
      {Array.from(info, (_, index) => (
        <div key={index} className="flex gap-3">
          <BsInfoCircleFill size={20} color="#AFAFB6" className="mt-1" />

          <p className="text-sm text-[#AFAFB6] bg-[#40404F] w-full md:w-2xl h-16 animate-pulse rounded-lg"></p>
        </div>
      ))}
    </>
  );
};

export default ShareholderInfoSkeleton;
