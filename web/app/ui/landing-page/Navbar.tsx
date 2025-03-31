"use client";

import Image from "next/image";
import Link from "next/link";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { data: session } = useSession();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 0);

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSignIn = () => {
    signIn("google");
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className="px-2 sticky top-5 z-30 mt-5"
    >
      <nav
        className={`bg-[#f9f8f6]/95 max-w-[1140px] mx-auto flex justify-between ease-in-out ${
          isScrolled
            ? "shadow-[1px_1px_4px_rgba(0,0,0,0.1),_-0.5px_-0.5px_1px_rgba(0,0,0,0.05)]"
            : "shadow-none"
        } items-center py-3 md:py-3.5 px-4 rounded-lg`}
      >
        <Link href="/" className="focus:outline-none">
          <Image
            src="https://finchat.io/cdn-cgi/image/width=640/assets/finchat-logos/finchat-logo-wordmark-light.png"
            alt="finsight logo"
            width={140}
            height={140}
            className="hidden md:block"
          />

          <Image
            src="https://finchat.io/cdn-cgi/image/width=640/assets/finchat-logos/finchat-light-3d.png"
            alt="finsight logo"
            width={32}
            height={32}
            className="md:hidden"
          />
        </Link>

        <ul className="flex items-center md:text-sm text-xs tracking-wider gap-3 sm:gap-6 xl:gap-8 text-[#777169] font-semibold">
          <li className="hover:opacity-50 uppercase">
            <Link href="/pricing">PRICING</Link>
          </li>

          <li>
            {session?.user ? (
              <Link
                href="/dashboard"
                className="rounded-4xl text-xs uppercase focus:outline-none h-9 md:h-auot cursor-pointer bg-black text-white px-3.5 py-2 md:px-6 md:py-3 font-bold hover:opacity-50"
              >
                DASHBOARD
              </Link>
            ) : (
              <button
                onClick={handleSignIn}
                className="rounded-4xl focus:outline-none cursor-pointer bg-[#E8E6E3] hover:bg-[#C9C6C0] text-black px-4 py-2 font-semibold"
              >
                Sign up free
              </button>
            )}
          </li>
        </ul>
      </nav>
    </motion.header>
  );
};

export default Navbar;
