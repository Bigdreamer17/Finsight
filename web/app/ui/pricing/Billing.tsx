"use client";

import { motion } from "framer-motion";
import { type RefObject, useState } from "react";
import BillingCard from "./BillingCard";
import type { billingOption } from "./types";

const Billing = ({ ref }: { ref: RefObject<HTMLElement | null> }) => {
  const [isMonthly, setIsMonthly] = useState(true);

  const billingOptions: billingOption[] = [
    {
      type: "Free",
      subHeading: "Powerful tools, for free",
      separator: "Base offerings",
      services: [
        "2 Years of Financials",
        "2 Years of KPI Data",
        "5 Copilot Prompts/mo",
      ],
    },
    {
      type: "Pro",
      price: isMonthly ? 1200 : 1000,
      subHeading: "Your information edge",
      separator: "Everything in Free +",
      services: [
        "5+ Years of Financials",
        "5+ Years of KPI Data",
        "500 Copilot Prompts/mo",
        "Customer support",
        "Equity Research and Company projections",
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col max-w-fit items-center gap-3">
        <div className="relative rounded-full flex items-center min-w-fit bg-[#3F404D]">
          <button
            className={`px-2 py-4 text-center hover:cursor-pointer focus:outline-none z-10 w-36 font-medium ${isMonthly ? "text-black transition-colors duration-300 delay-100" : "text-[#EDEDF1]"}`}
            onClick={() => setIsMonthly(true)}
          >
            Billed Monthly
          </button>

          <button
            className={`px-2 py-4 text-center hover:cursor-pointer focus:outline-none z-10 w-36 font-medium ${!isMonthly ? "text-black transition-colors duration-300 delay-100" : "text-[#EDEDF1]"}`}
            onClick={() => setIsMonthly(false)}
          >
            Billed Yearly
          </button>

          <motion.span
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`absolute h-[85%] ${isMonthly ? "w-[50%]" : "w-[48%]"} top-1/2 -z-0 -translate-y-1/2 bg-[#F9F8F6] focus:outline-none rounded-full`}
            style={{
              left: isMonthly ? "4px" : "calc(100% - 48% - 4px)",
            }}
          />
        </div>

        <p className="text-[#EDEDF1] text-[13px] font-medium">
          Save up to 20% by paying yearly - 2 months free
        </p>
      </div>

      <div className="gap-5 w-full max-w-[500px] sm:max-w-fit px-4 grid grid-cols-1 md:grid-cols-2 mx-auto">
        {billingOptions.map((options, index) => (
          <BillingCard key={index} {...options} ref={ref} />
        ))}
      </div>
    </div>
  );
};

export default Billing;
