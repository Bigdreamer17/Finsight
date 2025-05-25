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
    "An error occurred while getting companies. Please try again.";

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
    <div className="sm:min-h-20 min-h-32 w-full grid place-items-center">
      <div className="flex flex-col sm:flex-row items-center gap-5">
        <div className="text-center flex flex-col sm:flex-row items-center gap-2">
          <RiSignalWifiErrorFill size={20} />

          <p className="text-[13px] font-light max-w-2xl">{description}</p>
        </div>

        <button
          className="rounded-full w-full sm:w-auto justify-center py-2 px-[42px] hover:cursor-pointer font-semibold text-sm bg-[#27AA43] hover:bg-[#229549] text-white flex gap-2 items-center"
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
