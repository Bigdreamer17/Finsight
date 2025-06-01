import { atom } from "jotai";
import type { metricType } from "../ui/dashboard/types";
import { metrics } from "../ui/dashboard/data";

export const dashboardMetricAtom = atom<metricType[]>(metrics);
