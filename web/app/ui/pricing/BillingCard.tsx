"use client";

import { IoIosArrowDown, IoIosCheckmarkCircleOutline } from "react-icons/io";
import { signIn, useSession } from "next-auth/react";
import { spaceGrotesk } from "@/app/fonts";
import type { billingCardProps } from "./types";

const BillingCard = ({
  type,
  price,
  subHeading,
  separator,
  services,
  ref,
}: billingCardProps) => {
  const { data: session } = useSession();

  const isSubscribed =
    type === "Free"
      ? session?.user !== null && session?.user !== undefined
      : session?.user?.isUpgraded === true;
  console.log({ session, isSubscribed, type });

  const buttonTitle =
    type === "Free"
      ? session?.user?.isUpgraded === true
        ? "Upgraded"
        : session?.user !== null && session?.user !== undefined
          ? "Subscribed"
          : "Upgrade"
      : session?.user?.isUpgraded === true
        ? "Subscribed"
        : "Upgrade";

  const handleSeeAllClick = () => {
    if (ref.current) {
      const elementBottom =
        ref.current.getBoundingClientRect().bottom + window.scrollY;
      window.scrollTo({ top: elementBottom, behavior: "smooth" });
    }
  };

  const handleClickUpgrade = () => {
    if (type === "Free") {
      signIn("google");
    } else if (type === "Pro") {
      signIn("google");
    }
  };

  return (
    <div className="px-3 py-5 rounded-2xl min-h-[500px] border border-[#EDEDF1]/20 text-[#F9F8F6] flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-xl">{type}</h3>

        <h4 className="text-sm text-[#EDEDF1]/70">{subHeading}</h4>
      </div>

      <div>
        {price && (
          <div className="flex items-end gap-3">
            <span className="text-5xl font-semibold">{price} Birr</span>

            <span className="text-[#EDEDF1] uppercase">/month</span>
          </div>
        )}
      </div>

      <div className="flex justify-between gap-1 items-center">
        <hr className="flex-1 border-[#EDEDF1]/20" />

        <p className="uppercase font-medium text-xs">{separator}</p>

        <hr className="flex-1 border-[#EDEDF1]/20" />
      </div>

      <div className="flex flex-col gap-4 mb-5">
        {services.map((service, index) => (
          <div key={index} className="flex gap-2 items-center">
            <IoIosCheckmarkCircleOutline size={14} />

            <p className="text-[13px]">{service}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-4">
        <button
          disabled={isSubscribed}
          className={`rounded-full text-center uppercase font-medium p-3 w-full border hover:cursor-pointer disabled:cursor-auto disabled:opacity-100 hover:opacity-80 ${isSubscribed ? "border-[#EDEDF1]/70 text-[#EDEDF1]/70" : "border-[#F9F8F6] text-[#F9F8F6]"} ${spaceGrotesk.className}`}
          onClick={handleClickUpgrade}
        >
          {buttonTitle}
        </button>

        <button
          onClick={handleSeeAllClick}
          className="flex gap-2 hover:cursor-pointer focus:outline-none hover:opacity-80 justify-center items-center"
        >
          <span className="uppercase text-xs font-medium">
            see all features
          </span>

          <IoIosArrowDown size={14} />
        </button>
      </div>
    </div>
  );
};

export default BillingCard;
