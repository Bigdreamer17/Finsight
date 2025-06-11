"use client";

import { kpisMetricsAtom, kpisGraphAtom } from "@/app/store/financialsMetrics";
import { useAtom } from "jotai";
import { BarGraph } from "../../../common/Charts";
import type { barChartType } from "../../../common/types";
import { GoDotFill } from "react-icons/go";
import { colors } from "../../../common/data";
import { AiOutlineClose } from "react-icons/ai";
import { fieldsMap } from "./data";
import Image from "next/image";
import type { tabelDataProps } from "../balance-sheet/types";

const BalanceGraph = ({ tableData }: tabelDataProps) => {
  const [metrics] = useAtom(kpisMetricsAtom);
  const [kpisMetrics, setKpisMetrics] = useAtom(kpisGraphAtom);

  if (kpisMetrics.length < 1) {
    return <></>;
  }

  const graphData = tableData.map((data) => {
    let cur: barChartType = { fiscal_year: data.fiscal_year };

    kpisMetrics.forEach((metric) => {
      cur = { ...cur, [metric.name]: data[metric.name] };
    });

    return cur;
  });

  const chartWidth = Math.max(metrics.length * graphData.length * 40, 600);

  return (
    <div className="flex flex-col gap-5 mt-5">
      <div className="border-r border-[#40404F] flex items-stretch z-0">
        <BarGraph
          data={graphData}
          metrics={metrics}
          map={fieldsMap}
          left={tableData.length < 9 ? 150 : 50}
          right={tableData.length < 9 ? 150 : 50}
          width={chartWidth}
          noTooltip
        />
      </div>

      <div className="self-end flex gap-3 items-center">
        <span className="text-white/50 text-xs self-end">Powered by</span>
        <Image
          width={16}
          height={16}
          className="w-4 h-4 sm:h-4 sm:w-4 md:w-4 md:h-4 rounded-sm"
          src="https://finchat.io/cdn-cgi/image/width=64,quality=100/assets/finchat-logos/finchat-icon-dark.png"
          alt="Finsight assistant avatar"
        />
        <span className="font-medium">FinSight</span>
      </div>

      <div className="flex flex-col gap-3 border-t border-[#40404F]">
        {kpisMetrics.map((metric, index) => {
          const idx = metrics.indexOf(metric);
          const metricColor = colors[idx];

          return (
            <div
              key={index}
              className="flex items-center gap-3 py-1 border-b border-[#40404F]"
            >
              <GoDotFill size={20} color={metricColor} />

              <span className="text-sm">{fieldsMap[metric.name]}</span>

              <button
                className="p-[1px] bg-red-500/30 rounded-sm ml-auto hover:cursor-pointer focus:outline-none"
                onClick={() =>
                  setKpisMetrics((prev) =>
                    prev.filter((value) => value.name !== metric.name),
                  )
                }
              >
                <AiOutlineClose size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BalanceGraph;
