"use client";

import { projectionsNavigationAtom } from "@/app/store/projectionsNavigation";
import { useAtom } from "jotai";
import { navigation as navigations } from "./data";

const ProjectionsNavigation = () => {
  const [navigation, setNavigation] = useAtom(projectionsNavigationAtom);

  return (
    <div className="overflow-hidden max-w-full min-h-fit">
      <div className="flex gap-2 items-center overflow-x-auto no-scrollbar min-h-fit">
        {navigations.map((nav, index: number) => {
          const isActive = nav === navigation;

          return (
            <button
              key={index}
              disabled={isActive}
              className={`px-4 py-2 text-center rounded-md min-w-fit hover:bg-[#40404F] hover:cursor-pointer focus:outline-none text-xs sm:text-sm border border-[#40404F] ${isActive ? "bg-[#40404F] font-semibold" : "bg-[#2C2C35] font-light"}`}
              onClick={() => setNavigation(nav)}
            >
              {nav}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectionsNavigation;
