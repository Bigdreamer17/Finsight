"use client";

import { projectionsNavigationAtom } from "@/app/store/projectionsNavigation";
import { useAtom } from "jotai";
import { fieldsMap } from "./data";
import { AreaGraph } from "../../common/Charts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProjectionsContainer = ({ projectionData }: any) => {
  const [navigation] = useAtom(projectionsNavigationAtom);

  const graphData = projectionData[fieldsMap[navigation]];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arranged = graphData.graph.map((g: any) => ({
    year: g.fiscal_year,
    count: g.value,
  }));

  return (
    <div className="flex flex-col gap-2">
      <div className="border-b border-r border-[#40404F] relative z-10">
        <AreaGraph toolTipTitle={navigation} data={arranged} />

        <p className="text-center text-xs font-light">Year</p>
      </div>
    </div>
  );
};

export default ProjectionsContainer;
