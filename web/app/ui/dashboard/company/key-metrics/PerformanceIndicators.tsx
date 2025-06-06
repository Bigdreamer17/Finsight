import { BuyerProfitabilityBadge, RiskBadge } from "../../common/Badges";
import type { performanceIndicatorsProps } from "./types";

const PerformanceIndicators = ({
  performanceIndicators,
}: performanceIndicatorsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 basis-1/2 shrink-0">
      <div className="flex flex-col p-4 sm:border-r border-b gap-2">
        <h4 className="text-sm">Profit Generation:</h4>

        <p className="w-full pb-1 text-xs font-light flex items-center gap-2 justify-between border-b border-b-[#40404F]">
          <span>ROA:</span>

          <span>
            {performanceIndicators?.roa
              ? `${performanceIndicators.roa.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%`
              : "-"}
          </span>
        </p>

        <p className="w-full pb-1 text-xs font-light flex items-center gap-2 justify-between border-b border-b-[#40404F]">
          <span>ROE:</span>

          <span>
            {performanceIndicators?.roe
              ? `${performanceIndicators.roe.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%`
              : "-"}
          </span>
        </p>
      </div>

      <div className="flex flex-col p-4 sm:border-l border-b gap-1">
        <h4 className="text-sm">Buyer Profitability:</h4>

        <p className="w-full pb-1 text-xs font-light flex items-center gap-2 border-b border-b-[#40404F]">
          <BuyerProfitabilityBadge
            size={20}
            health={performanceIndicators?.profitability ?? ""}
          />

          <span>{performanceIndicators?.profitability ?? "-"}</span>
        </p>
      </div>

      <div className="flex flex-col p-4 sm:border-r sm:border-t gap-2">
        <h4 className="text-sm">Financially stable or risky:</h4>

        <p className="w-full pb-1 text-xs font-light flex items-center gap-2 justify-between border-b border-b-[#40404F]">
          <span className="min-w-fit">Debt to equity ratio:</span>

          <span>
            {performanceIndicators?.debt_to_equity
              ? `${performanceIndicators.debt_to_equity.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
              : "-"}
          </span>
        </p>
      </div>

      <div className="flex flex-col p-4 sm:border-l border-t gap-1">
        <h4 className="text-sm">Risk level:</h4>

        <p className="w-full pb-1 text-xs font-light flex items-center gap-2 border-b border-b-[#40404F] mb-2">
          <RiskBadge size={20} health={performanceIndicators?.risk ?? ""} />

          <span>{performanceIndicators?.risk ?? "-"}</span>
        </p>
      </div>
    </div>
  );
};

export default PerformanceIndicators;
