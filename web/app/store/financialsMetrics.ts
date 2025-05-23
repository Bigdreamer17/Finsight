import { atom } from "jotai";
import type { metricType } from "../ui/dashboard/types";
import { incomeStatementMetrics } from "../ui/dashboard/company/financials/income-statement/data";
import { balanceSheetMetrics } from "../ui/dashboard/company/financials/balance-sheet/data";
import { cashFlowMetrics } from "../ui/dashboard/company/financials/cash-flow-statement/data";
import { kpisMetrics } from "../ui/dashboard/company/financials/kpis/data";

export const incomeStatementMetricsAtom = atom<metricType[]>(
  incomeStatementMetrics,
);

export const balanceSheetMetricsAtom = atom<metricType[]>(balanceSheetMetrics);
export const cashFlowMetricsAtom = atom<metricType[]>(cashFlowMetrics);
export const kpisMetricsAtom = atom<metricType[]>(kpisMetrics);
