import Image from "next/image";
import { FaCheck } from "react-icons/fa";

const Cards = () => {
  return (
    <section className="mx-auto max-w-[1120px] px-10 mt-40 py-16 flex sm:flex-row flex-col gap-36 items-center">
      <div className="relative">
        <Image
          src="https://finchat.io/cdn-cgi/image/width=640/assets/marketing-pages/table.png"
          alt="decision"
          width={550}
          height={1000}
          className="object-cover"
        />

        <div className="absolute -bottom-10 -right-5 sm:-right-10 grid place-items-center size-20 md:h-[120px] md:w-[120px] shadow-xl lg:h-[180px] lg:w-[180px] rounded-full">
          <FaCheck
            size={90}
            className="text-green-500 size-[60px] md:size-[90px]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-[2.5rem] leading-14">
          Better data for better decisions.
        </h3>

        <p className="max-w-lg">
          <mark className="bg-[#FFE7BA]">Institutional-quality data</mark>{" "}
          that&apos;s been verified by human equity analysts. Our trusted,
          in-depth information helps you capitalize on opportunities.
        </p>

        <p className="text-[10px] font-semibold text-white rounded-2xl py-0.5 px-3 max-w-fit bg-[#5E5E74]">
          Financials and estimates by S&P Market Intelligence
        </p>
        <p className="text-[10px] font-semibold text-white rounded-2xl py-0.5 px-3 max-w-fit bg-[#5E5E74]">
          Segments and KPIs by FinChat Verified Data
        </p>
      </div>
    </section>
  );
};

export default Cards;
