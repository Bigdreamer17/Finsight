"use client";

import Image from "next/image";
import type { navigationType } from "./types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaChartLine } from "react-icons/fa";
import { RiMenuAddLine } from "react-icons/ri";
import { cn } from "@/app/lib/utils";
import { MdLogout } from "react-icons/md";
import { signOut } from "next-auth/react";

const Sidebar = ({ className }: { className?: string }) => {
  const pathName = usePathname();

  const pathLength = pathName.split("/").length;

  const handleLogout = () => {
    signOut({ redirectTo: "/" });
  };

  const navigation: navigationType[] = [
    {
      element: (
        <Image
          src="https://finchat.io/cdn-cgi/image/width=64,quality=100/assets/finchat-logos/finchat-icon-dark.png"
          alt="finsight logo"
          width={50}
          height={50}
          className="z-50"
        />
      ),
      href: "/",
    },
    {
      element: <RiMenuAddLine size={20} />,
      href: "/dashboard",
      name: "Dashboard",
      isActive: pathName.includes("dashboard") && pathLength === 2,
    },
    {
      element: <TbBrandGoogleAnalytics size={20} />,
      href: "/dashboard/company/2d12ea5a-dce7-4722-8014-bf596514cbe7",
      name: "Analysis",
      isActive: pathName.includes("dashboard/company"),
    },
    {
      element: <FaChartLine size={20} />,
      href: "/charting",
      name: "Charting",
      isActive: pathName.includes("charting"),
    },
  ];

  return (
    <section
      className={cn(
        "flex flex-col z-50 gap-3 border-r border-r-[#40404F] h-screen w-20 shrink-0",
        className,
      )}
    >
      {navigation.map((nav, index: number) => (
        <Link
          href={nav.href}
          key={index}
          className="flex z-50 flex-col items-center gap-1"
        >
          <div
            className={`p-3 z-50 ${nav.isActive ? "bg-[#40404F]" : ""} ${index !== 0 ? "hover:bg-[#40404F]" : ""} rounded-sm`}
          >
            {nav.element}
          </div>

          {nav.name && <span className="text-[10px] z-50">{nav.name}</span>}
        </Link>
      ))}

      <button
        className="mt-auto focus:outline-none hover:cursor-pointer mb-16 flex z-50 flex-col items-center gap-1"
        onClick={handleLogout}
      >
        <div className={`p-3 z-50 hover:bg-[#40404F] rounded-sm`}>
          <MdLogout size={20} />
        </div>

        <span className="text-[10px] z-50">Log Out</span>
      </button>
    </section>
  );
};

export default Sidebar;
