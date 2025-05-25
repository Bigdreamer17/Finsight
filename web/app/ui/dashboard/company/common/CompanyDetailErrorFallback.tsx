"use client";

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

  const buttonTitle = "Try Again";

  const description =
    "An error occurred while getting company details. Please try again.";

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
    <div className="w-full grid place-items-center px-4 pb-3">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-5 py-4 rounded-lg bg-[#2C2C35] w-full h-full">
        <div className="text-center flex flex-col sm:flex-row items-center gap-2">
          <RiSignalWifiErrorFill size={20} />

          <p className="text-[13px] font-light max-w-2xl">{description}</p>
        </div>

        <button
          className="rounded-full w-full sm:w-auto justify-center max-w-80 py-2 px-[42px] hover:cursor-pointer font-semibold text-sm bg-[#27AA43] hover:bg-[#229549] text-white flex gap-2 items-center"
          disabled={isResetting}
          onClick={retry}
        >
          {icon}
          {buttonTitle}
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
