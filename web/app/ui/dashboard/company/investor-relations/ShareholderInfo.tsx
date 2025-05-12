import { BsInfoCircleFill } from "react-icons/bs";
import type { shareholderInfoProps } from "./types";

const ShareholderInfo = ({ information }: shareholderInfoProps) => {
  return (
    <>
      {information.map((info, index) => (
        <div key={index} className="flex gap-3">
          <BsInfoCircleFill size={20} color="#AFAFB6" className="mt-1" />

          <p className="text-sm text-[#AFAFB6] max-w-full md:max-w-2xl">
            {info}
          </p>
        </div>
      ))}
    </>
  );
};

export default ShareholderInfo;
