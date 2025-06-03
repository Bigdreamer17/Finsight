"use client";

import { type ChangeEvent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { ROICalculatorProps } from "./types";

const ROICalculator = ({
  averageRevenueGrowth,
  averageProfitGrowth,
}: ROICalculatorProps) => {
  const [returnOneYear, setReturnOneYear] = useState("-");

  const cost = averageRevenueGrowth - averageProfitGrowth;
  const roiPercentage = averageProfitGrowth / cost;

  const handleChange = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      const isValid = !isNaN(val);

      setReturnOneYear(
        isValid && val * roiPercentage !== 0
          ? `${(val * roiPercentage).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} Birr`
          : "-",
      );
    },
    300,
  );

  return (
    <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col gap-4">
      <h3 className="text-xl font-medium flex">ROI calculator:</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 sm:col-span-2 md:col-auto">
          <label className="ml-5">Enter amount:</label>

          <input
            type="text"
            placeholder="Investment amount"
            className="rounded-full w-full pl-4 focus:outline-none focus-visible:outline-none focus:ring-0 bg-[#40404F] placeholder:text-[#AFAFB6] text-white py-2 px-4"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="ml-5">Return after 3 YR</span>

          <div className="rounded-full w-full pl-4 focus:outline-none focus-visible:outline-none focus:ring-0 bg-[#40404F] placeholder:text-[#AFAFB6] text-white py-2 px-4">
            <p className="border-b-[0.5px]">{returnOneYear}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
