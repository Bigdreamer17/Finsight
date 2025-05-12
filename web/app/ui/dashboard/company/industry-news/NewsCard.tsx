import type { newsType } from "./type";
import Image from "next/image";

const NewsCard = ({ imageUrl, title, description }: newsType) => {
  return (
    <div className="rounded-lg bg-[#40404F] p-4 flex flex-col sm:flex-row items-start gap-5 max-w-fit">
      <Image
        src={imageUrl}
        height={150}
        width={150}
        alt="news image"
        className="object-cover rounded-md aspect-square min-w-[150px] max-w-[150px] min-h-[150px] max-h-[150px]"
      />

      <div className="flex flex-col gap-3">
        <h5>{title}</h5>

        <p className="text-sm text-[#AFAFB6] md:max-w-xl">{description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
