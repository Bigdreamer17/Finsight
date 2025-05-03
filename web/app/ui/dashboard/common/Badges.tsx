import { GoDotFill } from "react-icons/go";
import type { badgeProps } from "./types";

export const FinancialBadge = ({ health, size }: badgeProps) => {
  return (
    <GoDotFill
      size={size ?? 30}
      color={
        health.includes("strong")
          ? "#0BD28B"
          : health.includes("moderate")
            ? "#FFD166"
            : "#EF476F"
      }
    />
  );
};

export const InvestmentBadge = ({ health, size }: badgeProps) => {
  return (
    <GoDotFill
      size={size ?? 30}
      color={
        health.includes("high") || health.includes("High")
          ? "#0BD28B"
          : health.includes("moderate") || health.includes("Moderate")
            ? "#FFD166"
            : "#EF476F"
      }
    />
  );
};

export const BuyerProfitabilityBadge = ({ health, size }: badgeProps) => {
  return (
    <GoDotFill
      size={size ?? 30}
      color={
        health.includes("Strong") || health.includes("strong")
          ? "#0BD28B"
          : health.includes("moderate") || health.includes("Moderate")
            ? "#FFD166"
            : "#EF476F"
      }
    />
  );
};

export const RiskBadge = ({ health, size }: badgeProps) => {
  return (
    <GoDotFill
      size={size ?? 30}
      color={
        health.includes("Low") || health.includes("low")
          ? "#0BD28B"
          : health.includes("moderate") || health.includes("Moderate")
            ? "#FFD166"
            : "#EF476F"
      }
    />
  );
};
