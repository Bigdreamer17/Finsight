"use client";

import { useEffect, useState } from "react";
import { spaceGrotesk } from "@/app/fonts";
import { prompts } from "./data";
import { shuffleArray } from "./utils";

const Hero = () => {
  const [shuffledPrompts, setShuffledPrompts] = useState(() =>
    shuffleArray(prompts),
  );
  const [typedPrompts, setTypedPrompts] = useState<string[]>([]);

  const typePrompt = (fullText: string, cb: (text: string) => void) => {
    let i = 0;
    const interval = setInterval(() => {
      cb(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 30);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newShuffled = shuffleArray(prompts);
      setShuffledPrompts(newShuffled);
      setTypedPrompts(Array(newShuffled.length).fill(""));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (shuffledPrompts.length > 0) {
      shuffledPrompts.forEach((prompt, i) => {
        setTimeout(() => {
          typePrompt(prompt, (typed) => {
            setTypedPrompts((prev) => {
              const updated = [...prev];
              updated[i] = typed;
              return updated;
            });
          });
        }, i * 100);
      });
    }
  }, [shuffledPrompts]);

  return (
    <section className="mx-auto max-w-[920px] py-16 flex flex-col gap-24">
      <h1
        className={`text-center md:text-[4rem] text-[2.5rem] leading-11 md:leading-[72px] ${spaceGrotesk.className} font-medium`}
      >
        The future of investment research, powered by AI.
      </h1>

      <div className="w-full gap-3 px-4 grid grid-cols-1 md:grid-cols-2 mx-auto">
        {typedPrompts.slice(0, 4).map((prompt, index) => (
          <div
            key={index}
            className="w-full p-2.5 bg-white rounded-lg min-h-[60px]"
          >
            <span className="whitespace-pre-wrap">{prompt}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
