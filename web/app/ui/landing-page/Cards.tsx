import { spaceGrotesk } from "@/app/fonts";
import Image from "next/image";
import Features from "./Features";

const Cards = () => {
  return (
    <section className="mx-auto xl:max-w-[1120px] max-w-full mt-40 px-4 py-16 flex sm:flex-row flex-col-reverse gap-10 md:gap-16">
      <div className="flex flex-col gap-5 justify-between basis-[45%] shrink-0">
        <div className="flex flex-col gap-3">
          <h3
            className={`md:text-[2.5rem] text-[2rem] ${spaceGrotesk.className} font-medium`}
          >
            Leverage FinSight in your research process
          </h3>

          <p className="text-[#49495b] max-w-full text-sm">
            The all-in-one fundamental research terminal.
          </p>
        </div>

        <Features />
      </div>

      <div className="basis-[45%] shrink-0 rounded-lg">
        <Image
          src="/download.webp"
          alt="stock image"
          height={400}
          width={300}
          className="rounded-lg object-cover w-full h-full"
        />
      </div>
    </section>
  );
};

export default Cards;
