import { atom } from "jotai";
import type { metricType } from "../ui/dashboard/types";
import { incomeStatementMetrics } from "../ui/dashboard/company/financials/income-statement/data";

export const incomeStatementMetricsAtom = atom<metricType[]>(
  incomeStatementMetrics,
);
