"use client";

import { useEffect, useRef, useState } from "react";
import Search from "./Search";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import Sidebar from "../Sidebar";

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <section className="sticky bg-[#1C1C21] z-20 top-0 left-0 right-0 w-full py-5 px-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <Search />

        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <button className="uppercase rounded-full py-2 px-[42px] grid place-items-center font-semibold text-sm bg-[#27AA43] hover:bg-[#229549] text-white shrink-0">
            UPGRADE
          </button>

          <button
            onClick={handleClick}
            className="md:hidden focus:outline-none"
          >
            {isOpen ? <IoCloseOutline size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </section>

      {isOpen && (
        <div ref={ref}>
          <Sidebar
            className={`md:hidden bg-[#1C1C21] fixed z-30 top-0 ${isOpen ? "left-0" : "-left-20"} transition duration-400 ease-in-out`}
          />
        </div>
      )}
    </>
  );
};

export default Topbar;
