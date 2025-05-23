import { spaceGrotesk } from "@/app/fonts";

const Hero = () => {
  const prompts = [
    "Summarize Microsoft's latest earnings call.",
    "How have Amazon's focus areas changed?",
    "What did Uber's management team say about margins?",
    "What's Meta's latest financial guidance?",
  ];

  return (
    <section className="mx-auto max-w-[920px] py-16 flex flex-col gap-24">
      <h1
        className={`text-center md:text-[4rem] text-[2.5rem] leading-11 md:leading-[72px] ${spaceGrotesk.className} font-medium`}
      >
        The future of investment research, powered by AI.
      </h1>

      <div className="w-full gap-3 px-4 grid grid-cols-1 md:grid-cols-2 mx-auto">
        {prompts.map((prompt, index) => {
          const params = new URLSearchParams();
          params.set("prompt", prompt);

          return (
            <div key={index} className="w-full p-2.5 bg-white rounded-lg">
              {prompt}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Hero;
