import { spaceGrotesk } from "@/app/fonts";

const Hero = () => {
  return (
    <section className="mx-auto max-w-[920px] py-16 flex flex-col gap-24">
      <h1
        className={`text-center text-[#F9F8F6] md:text-[4rem] max-w-3xl mx-auto text-[2.5rem] leading-11 md:leading-[72px] ${spaceGrotesk.className} font-medium`}
      >
        When time is money, choose the right plan.
      </h1>

      <div className="w-full gap-3 px-4 grid grid-cols-1 md:grid-cols-2 mx-auto"></div>
    </section>
  );
};

export default Hero;
