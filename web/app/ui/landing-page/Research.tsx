import { spaceGrotesk } from "@/app/fonts";
import Image from "next/image";
import LinearGraph from "./LinearGraph";

const Research = () => {
  return (
    <section className="relative overflow-x-clip">
      <div className="flex gap-5 justify-between lg:flex-row flex-col">
        <div className="pl-8 flex max-w-[355px] mr-auto text-white text-sm flex-col gap-3">
          <div className="flex gap-3">
            <p className="bg-[#30313b] basis-11/12 p-4 text-white rounded-lg rounded-br-none">
              Summarize Microsoft&apos;s last quarter...
            </p>

            <div className="bg-[#30313b] self-end p-4 rounded-full"></div>
          </div>

          <div className="bg-[#30313b] z-10 w-[86%] rounded-lg rounded-bl-none flex flex-col gap-3 py-4 px-2">
            <p className="rounded-br-none">
              ...the company also experienced growth in various segments,
              including a 22% increase in Cloud revenue...
            </p>

            <Image
              src="https://finchat.io/assets/marketing-pages/company-logos/msft.svg"
              alt="Microsoft logo"
              width={24}
              height={24}
              className="ml-3"
            />

            <LinearGraph className="bg-[#05A6F0]" />
          </div>
        </div>
      </div>

      <div className="flex -mt-20 justify-between items-end -z-10">
        <Image
          src="https://finchat.io/cdn-cgi/image/width=640/assets/marketing-pages/dark-mockups/lvmh-chart.png"
          alt="company graph"
          width={555}
          height={120}
          className="-translate-x-10/12 lg:translate-x-0"
        />

        <div className="max-w-[355px] lg:flex hidden -mb-24 ml-auto mr-44 text-white text-sm flex-col gap-3">
          <div className="flex gap-3">
            <p className="bg-[#30313b] basis-11/12 p-4 text-white rounded-lg rounded-br-none">
              ...see the progress from our membership growth in Q2...
            </p>

            <div className="bg-[#30313b] self-end p-4 rounded-full"></div>
          </div>

          <div className="bg-[#30313b] w-[86%] rounded-lg rounded-bl-none flex flex-col gap-3 py-4 px-2">
            <div className="flex items-center gap-3">
              <Image
                src="https://finchat.io/cdn-cgi/image/width=32/assets/marketing-pages/company-logos/nflx.png"
                alt="netflix logo"
                width={24}
                height={24}
              />

              <p className="rounded-br-none">Membership Count</p>
            </div>

            <LinearGraph className="bg-[#EA4335]" />
          </div>
        </div>
      </div>

      <Image
        src="https://finchat.io/cdn-cgi/image/width=640/assets/marketing-pages/dark-mockups/table.png"
        alt="stat decoration"
        width={555}
        height={120}
        className="absolute lg:block hidden top-1/3 -right-[310px] -translate-y-1/3"
      />

      <h2
        className={`text-center absolute lg:top-1/2 bottom-0 left-1/2 -translate-x-1/2 lg:-translate-y-1/2 max-w-[920px] z-20 lg:text-[4rem] text-[2rem] leading-11 lg:leading-[72px] ${spaceGrotesk.className} font-medium`}
      >
        The new standard for fundamental research.
      </h2>
    </section>
  );
};

export default Research;
