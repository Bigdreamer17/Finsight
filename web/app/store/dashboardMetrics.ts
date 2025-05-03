import { atom } from "jotai";
import type { metricType } from "../ui/dashboard/types";
import { dashboardMetrics } from "../ui/dashboard/data";

export const dashboardMetricAtom = atom<metricType[]>(
  dashboardMetrics.slice(0, 10),
);
