"use client";

import { spaceGrotesk } from "@/app/fonts";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Research = () => {
  const pathName = usePathname();

  const { data: session } = useSession();

  const handleSignIn = () => {
    signIn("google");
  };

  return (
    <section className="relative overflow-x-clip flex flex-col gap-3 mt-5">
      <h3
        className={`text-center text-[2.5rem] md:text-[3rem] leading-11 md:leading-[72px] ${spaceGrotesk.className} font-medium`}
      >
        Investment data at your fingertips
      </h3>

      <p className="text-[#49495b] text-center max-w-full sm:max-w-xl mx-auto text-sm">
        Institutional data quality for public equities around the country
        trusted by 250,000+ investors and organizations.
      </p>

      <div className="relative w-full max-w-3xl mx-auto">
        <Image
          src="/globe.png"
          alt="globe image"
          width={300}
          height={400}
          className="object-cover w-full h-full"
        />

        <div className="absolute z-20 left-1/2 bottom-0 -translate-x-1/2">
          {session?.user ? (
            <Link
              href="/dashboard"
              className={`rounded-4xl text-xs uppercase focus:outline-none h-9 ${pathName.includes("pricing") ? "bg-[#F9F8F6] text-black hover:opacity-80" : "bg-black text-white hover:opacity-50"} cursor-pointer px-3.5 py-2 md:px-6 md:py-3 font-bold `}
            >
              Explore Your Dashboard
            </Link>
          ) : (
            <button
              onClick={handleSignIn}
              className="rounded-4xl focus:outline-none cursor-pointer bg-[#E8E6E3] hover:bg-[#C9C6C0] text-black px-4 py-2 font-semibold"
            >
              Sign up free
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Research;
