"use client";

import {
  incomeStatementGraphAtom,
  incomeStatementMetricsAtom,
} from "@/app/store/financialsMetrics";
import { useAtom } from "jotai";
import { BarGraph } from "../../../common/Charts";
import type { tabelDataProps } from "../types";
import type { barChartType } from "../../../common/types";
import { GoDotFill, GoLock } from "react-icons/go";
import { colors } from "../../../common/data";
import { AiOutlineClose } from "react-icons/ai";
import { fieldsMap } from "./data";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

const IncomeGraph = ({ tableData }: tabelDataProps) => {
  const { data: session } = useSession();

  const [metrics] = useAtom(incomeStatementMetricsAtom);
  const [incomeMetrics, setIncomeMetrics] = useAtom(incomeStatementGraphAtom);

  if (incomeMetrics.length < 1) {
    return <></>;
  }

  const notPaid = session?.user?.isUpgraded
    ? incomeMetrics
    : incomeMetrics.filter((metric) => !metric.isPaidFeature);

  const dummyGraphData = tableData.map((data) => {
    let cur: barChartType = { fiscal_year: data.fiscal_year };

    incomeMetrics.forEach((metric) => {
      cur = { ...cur, [metric.name]: Math.random() * 10_000_000_000 };
    });

    return cur;
  });

  const graphData = tableData.map((data) => {
    let cur: barChartType = { fiscal_year: data.fiscal_year };

    notPaid.forEach((metric) => {
      cur = { ...cur, [metric.name]: data[metric.name] };
    });

    return cur;
  });

  return (
    <div className="flex flex-col gap-5 mt-5">
      {notPaid.length > 0 ? (
        <div className="border-r border-[#40404F] relative z-0">
          <BarGraph
            data={graphData}
            metrics={metrics}
            map={fieldsMap}
            left={tableData.length < 9 ? 150 : 50}
            right={tableData.length < 9 ? 150 : 50}
          />
        </div>
      ) : (
        <div className="border-r border-[#40404F] mr-5 pr-4 relative z-0">
          <BarGraph data={dummyGraphData} metrics={metrics} map={fieldsMap} />

          <div className="absolute z-10 top-0 bottom-0 right-0 left-0 backdrop-blur-lg flex flex-col items-center justify-center gap-4 text-center">
            <GoLock size={40} className="mx-auto" />

            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-semibold">Content Restricted</h3>

              <h4 className="text-lg font-medium">Upgrade to view more</h4>
            </div>

            <Link
              href="/pricing"
              className="uppercase rounded-full py-2 px-[42px] grid place-items-center font-semibold text-sm bg-[#27AA43] hover:bg-[#229549] text-white shrink-0"
            >
              upgrade
            </Link>
          </div>
        </div>
      )}

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
        {incomeMetrics.map((metric, index) => {
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
                  setIncomeMetrics((prev) =>
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

export default IncomeGraph;
