import { atom } from "jotai";
import { chartsData } from "../ui/dashboard/company/overview/data";
import type { chartMetricsType } from "../ui/dashboard/company/overview/types";

export const chartsAtom = atom<chartMetricsType[]>(chartsData.slice(2));
