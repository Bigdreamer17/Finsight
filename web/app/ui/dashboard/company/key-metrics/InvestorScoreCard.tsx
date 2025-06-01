import type { inverstorCardProps } from "./types";
import Image from "next/image";

const InvestorScoreCard = ({
  name,
  imageUrl,
  grade,
  comment,
  logic,
}: inverstorCardProps) => {
  return (
    <div className="rounded-lg bg-[#40404F] p-4 flex flex-col sm:flex-row items-start gap-5 max-w-xl min-w-full xl:min-w-xl">
      <Image
        src={imageUrl}
        height={500}
        width={1000}
        alt="news image"
        className="object-cover rounded-md aspect-square min-w-[150px] sm:max-w-[150px] min-h-[150px] sm:max-h-[150px] max-w-full max-h-full"
      />

      <div className="flex flex-col gap-2 self-stretch justify-between">
        <div className="flex flex-col">
          <h5 className="font-semibold">{name}</h5>

          {grade !== "" && (
            <p className="text-sm md:max-w-xl">
              <span className="font-medium">Score:</span>{" "}
              <span className="text-[#AFAFB6]">{grade}</span>
            </p>
          )}
        </div>

        {comment !== "" && (
          <p className="text-sm md:max-w-xl">
            <span className="font-medium">Comment:</span>{" "}
            <span className="text-[#AFAFB6]">{comment}</span>
          </p>
        )}

        {logic.length !== 0 && (
          <p className="text-sm md:max-w-xl">
            <span className="font-medium">Logic:</span>{" "}
            <span className="text-[#AFAFB6] ">{logic.join(", ")}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default InvestorScoreCard;
