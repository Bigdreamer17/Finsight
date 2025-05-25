"use client";

import SearchMetric from "./SearchMetric";
import { useRouter } from "next/navigation";
import { useState, startTransition } from "react";
import { FaArrowRotateRight } from "react-icons/fa6";
import { RiSignalWifiErrorFill } from "react-icons/ri";

const ErrorFallback = ({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) => {
  const router = useRouter();

  const title = "An error has occured";
  const buttonTitle = "Try Again";

  const description =
    "An error occurred while getting kpi details. Please try again.";

  const [isResetting, setIsResetting] = useState(false);

  const icon = (
    <FaArrowRotateRight
      data-testid="arrow-rotate-right"
      size={18}
      className={isResetting ? "animate-spin" : ""}
    />
  );

  function retry() {
    setIsResetting(true);
    startTransition(() => {
      router.refresh();
      resetErrorBoundary();
      setIsResetting(false);
    });
  }
  return (
    <div className="flex flex-col gap-2">
      <SearchMetric />

      <div className="h-full w-full bg-[#2C2C35] grid place-items-center mt-10">
        <div className="flex flex-col items-center gap-5">
          <div className="text-center flex flex-col gap-2">
            <h2 className="font-semibold text-xl sm:text-2xl">{title}</h2>

            <p className="text-[13px] font-light max-w-2xl">{description}</p>
          </div>

          <RiSignalWifiErrorFill size={100} />

          <button
            className="rounded-full py-2 px-[42px] hover:cursor-pointer font-semibold text-sm bg-[#27AA43] hover:bg-[#229549] text-white flex gap-2 items-center"
            disabled={isResetting}
            onClick={retry}
          >
            {icon}
            {buttonTitle}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
