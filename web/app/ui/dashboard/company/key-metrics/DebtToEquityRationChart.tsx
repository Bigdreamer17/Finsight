"use client";

import { GoDotFill } from "react-icons/go";
import { PieGraph } from "../../common/Charts";
import type { debtToEquityRationProps } from "./types";

const DebtToEquityRationChart = ({ data }: debtToEquityRationProps) => {
  return (
    <div className="flex md:flex-col items-center w-full">
      <div className="flex flex-col md:flex-row items-center gap-5">
        <div className="flex items-center gap-2">
          <GoDotFill size={20} color={"#3FFF00"} />

          <span>Equity</span>
        </div>
        <div className="flex items-center gap-2">
          <GoDotFill size={20} color={"#FF0000"} />

          <span>Debt</span>
        </div>
      </div>

      <PieGraph data={data} />
    </div>
  );
};

export default DebtToEquityRationChart;
