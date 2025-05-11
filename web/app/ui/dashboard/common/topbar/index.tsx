"use client";

import { useEffect, useRef, useState } from "react";
import Search from "./Search";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import Sidebar from "../Sidebar";
import { handleClickOutside } from "@/app/lib/utils/handleClickOutside";
import { companyType } from "./types";
import Link from "next/link";

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const companies: companyType[] = [
    {
      companyId: "123",
      name: "Wegagen bank",
      stockName: "Wegagen bank",
      imageUrl: "https://cdn.finchat.io/21835.png",
    },
    {
      companyId: "123",
      name: "Dashen bank",
      stockName: "Dashen bank",
      imageUrl:
        "https://media.glassdoor.com/sql/525842/dashen-bank-squarelogo-1461672481507.png",
    },
    {
      companyId: "123",
      name: "Neged bank",
      stockName: "Neged bank",
      imageUrl: "https://cdn.finchat.io/21835.png",
    },
    {
      companyId: "123",
      name: "Birhan bank",
      stockName: "Birhan bank",
      imageUrl: "https://cdn.finchat.io/21835.png",
    },
  ];

  useEffect(() => {
    function handleClickEvent(event: MouseEvent) {
      handleClickOutside(event, ref, handleClose);
    }

    document.addEventListener("mousedown", handleClickEvent);

    return () => {
      document.removeEventListener("mousedown", handleClickEvent);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <section className="sticky bg-[#1C1C21] z-20 top-0 left-0 right-0 w-full py-5 px-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <Search companies={companies} />

        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <Link
            href="/pricing"
            className="uppercase rounded-full py-2 px-[42px] grid place-items-center font-semibold text-sm bg-[#27AA43] hover:bg-[#229549] text-white shrink-0"
          >
            upgrade
          </Link>

          <button
            onClick={handleClick}
            className="lg:hidden focus:outline-none"
          >
            {isOpen ? <IoCloseOutline size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </section>

      {isOpen && (
        <div ref={ref}>
          <Sidebar
            className={`lg:hidden bg-[#1C1C21] fixed z-30 top-0 ${isOpen ? "left-0" : "-left-20"} transition duration-400 ease-in-out`}
          />
        </div>
      )}
    </>
  );
};

export default Topbar;
