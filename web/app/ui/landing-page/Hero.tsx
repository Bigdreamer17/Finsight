"use client";

import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { spaceGrotesk } from "@/app/fonts";
import { prompts } from "./data";
import { shuffleArray } from "./utils";

const Hero = () => {
  const [shuffledPrompts, setShuffledPrompts] = useState(() =>
    shuffleArray(prompts),
  );
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShuffledPrompts(shuffleArray(prompts));
      setAnimationKey((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [shuffledPrompts]);

  return (
    <section className="mx-auto max-w-[920px] py-16 flex flex-col gap-24">
      <h1
        className={`text-center md:text-[4rem] text-[2.5rem] leading-11 md:leading-[72px] ${spaceGrotesk.className} font-medium`}
      >
        The future of investment research, powered by AI.
      </h1>

      <div className="w-full gap-3 px-4 grid grid-cols-1 md:grid-cols-2 mx-auto">
        {shuffledPrompts.slice(0, 4).map((prompt, index) => (
          <div
            key={index}
            className="w-full p-2.5 bg-white rounded-lg min-h-[60px] font-normal"
          >
            <Typewriter
              key={`${animationKey}-${index}`}
              words={[prompt]}
              typeSpeed={30}
              deleteSpeed={0}
              delaySpeed={3000}
              cursor={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
