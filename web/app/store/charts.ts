import { atom } from "jotai";
import { chartsData } from "../ui/dashboard/company/overview/data";

export const chartsAtom = atom<string[]>(chartsData);
