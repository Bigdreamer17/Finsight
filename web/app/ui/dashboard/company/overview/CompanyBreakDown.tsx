"use client";

import { useEffect, useRef, useState } from "react";
import type { breakDownProps } from "./types";

const CompanyBreakDown = ({
  name,
  description,
  ceo,
  website,
  sector,
  foundationYear,
  marketCap,
  ev,
  sharesOut,
  revenue,
  employeeCount,
  pe,
  pb,
  evSales,
  evEbitda,
  pfcf,
  evGrossProfit,
  revThree,
  revFive,
  revTen,
  deThree,
  deFive,
  deTen,
  revFwdTwo,
  gross,
  ebitda,
  operating,
  preTax,
  net,
  fcf,
  roa,
  rota,
  roe,
  roce,
  roic,
  divYield,
  payout,
  dps,
  dpsThree,
  dpsFive,
}: breakDownProps) => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);

  const [divExpanded, setDivExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const el = divRef.current;
      if (el) {
        setCanScroll(el.scrollHeight > el.clientHeight);
        setContentHeight(el.scrollHeight);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (paragraphRef.current) {
      const el = paragraphRef.current;

      const totalHeight = el.scrollHeight;
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const threeLinesHeight = lineHeight * 3;

      setFullHeight(totalHeight);
      setCanExpand(totalHeight > threeLinesHeight);
    }
  }, [description]);

  const overviewSection = {
    Name: name,
    CEO: ceo,
    Website: website,
    Sector: sector,
    "Year Founded": foundationYear,
  };

  const profileSection = {
    "Market Cap": marketCap,
    EV: ev,
    "Shares Out": sharesOut,
    Revenue: revenue,
    Employees: employeeCount,
  };

  const valuationSection = {
    "P/E": pe,
    "P/B": pb,
    "EV/Sales": evSales,
    "EV/EBITDA": evEbitda,
    "P/FCF": pfcf,
    "EV/Gross Profit": evGrossProfit,
  };

  const growthSection = {
    "Rev 3Yr": revThree,
    "Rev 5Yr": revFive,
    "Rev 10Yr": revTen,
    "Dil EPS 3Yr": deThree,
    "Dil EPS 5Yr": deFive,
    "Dil EPS 10Yr": deTen,
    "Rev Fwd 2Yr": revFwdTwo,
  };

  const marginSection = {
    Gross: gross,
    EBITDA: ebitda,
    Operating: operating,
    "Pre-Tax": preTax,
    Net: net,
    FCF: fcf,
  };

  const returnsSection = {
    ROA: roa,
    ROTA: rota,
    ROE: roe,
    ROCE: roce,
    ROIC: roic,
  };

  const dividendsSection = {
    Yield: divYield,
    Payout: payout,
    DPS: dps,
    "DPS Growth 3Yr": dpsThree,
    "DPS Growth 5Yr": dpsFive,
  };

  return (
    <div
      className={`relative z-0 rounded-lg bg-[#2C2C35] flex flex-col gap-2 basis-1/2 transition-all duration-300 ease-in-out ${divExpanded || canScroll ? "pb-8" : ""}`}
    >
      <div
        ref={divRef}
        style={
          windowWidth < 768
            ? {
                maxHeight: divExpanded ? `${contentHeight}px` : "544px",
                transition: "max-height 0.5s ease-in-out",
              }
            : {}
        }
        className="overflow-hidden md:max-h-auto md:overflow-visible rounded-lg bg-[#2C2C35] flex flex-col gap-2 px-4 pt-4 md:pb-4 basis-1/2"
      >
        <h3 className="font-medium text-lg">Company Overview</h3>

        {/* Description */}
        <div className="mb-3">
          <p
            ref={paragraphRef}
            style={{
              maxHeight: expanded ? fullHeight : `${1.5 * 3}rem`,
            }}
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out leading-relaxed text-sm text-[#AFAFB6]`}
          >
            {description}
          </p>

          {canExpand && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="font-light hover:underline transition focus:outline-none hover:cursor-pointer duration-200"
            >
              {expanded ? "Hide" : "Show more"}
            </button>
          )}
        </div>

        {/* Company Overview Section */}
        {Object.entries(overviewSection).map(([name, value]) => (
          <p
            key={name}
            className="w-full pb-1 text-xs flex items-center gap-2 justify-between border-b border-b-[#40404F]"
          >
            <span>{name}</span>
            <span>{value}</span>
          </p>
        ))}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-3 mt-3">
          <div className="flex flex-col gap-4">
            {/* Profile Section */}
            <div>
              <h4 className="font-medium text-sm mb-3">Profile</h4>

              {Object.entries(profileSection).map(([name, value], index) => (
                <p
                  key={name}
                  className={`w-full pb-1 text-xs font-light flex items-center gap-2 justify-between ${index === Object.keys(profileSection).length - 1 ? "" : "border-b border-b-[#40404F] mb-2"}`}
                >
                  <span>{name}</span>
                  <span>{value}</span>
                </p>
              ))}
            </div>

            {/* Margin Section */}
            <div>
              <h4 className="font-medium text-sm mb-3">Margin</h4>

              {Object.entries(marginSection).map(([name, value], index) => (
                <p
                  key={name}
                  className={`w-full pb-1 text-xs font-light flex items-center gap-2 justify-between ${index === Object.keys(profileSection).length - 1 ? "" : "border-b border-b-[#40404F] mb-2"}`}
                >
                  <span>{name}</span>
                  <span>{value}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Valuation Section */}
            <div>
              <h4 className="font-medium text-sm mb-3">Valuation</h4>

              {Object.entries(valuationSection).map(([name, value], index) => (
                <p
                  key={name}
                  className={`w-full pb-1 text-xs font-light flex items-center gap-2 justify-between ${index === Object.keys(valuationSection).length - 1 ? "" : "border-b border-b-[#40404F] mb-2"}`}
                >
                  <span>{name}</span>
                  <span>{value}</span>
                </p>
              ))}
            </div>

            {/* Returns Section */}
            <div>
              <h4 className="font-medium text-sm mb-3">Returns</h4>

              {Object.entries(returnsSection).map(([name, value], index) => (
                <p
                  key={name}
                  className={`w-full pb-1 text-xs font-light flex items-center gap-2 justify-between ${index === Object.keys(profileSection).length - 1 ? "" : "border-b border-b-[#40404F] mb-2"}`}
                >
                  <span>{name}</span>
                  <span>{value}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="md:flex md:flex-col sm:grid sm:grid-cols-2 flex flex-col gap-4 sm:col-span-2 md:col-span-1">
            {/* Growth Section */}
            <div>
              <h4 className="font-medium text-sm mb-3">Growth</h4>

              {Object.entries(growthSection).map(([name, value], index) => (
                <p
                  key={name}
                  className={`w-full pb-1 text-xs font-light flex items-center gap-2 justify-between ${index === Object.keys(growthSection).length - 1 ? "" : "border-b border-b-[#40404F] mb-2"}`}
                >
                  <span>{name}</span>
                  <span>{value}</span>
                </p>
              ))}
            </div>

            {/* Dividends Section */}
            <div>
              <h4 className="font-medium text-sm mb-3">Dividends</h4>

              {Object.entries(dividendsSection).map(([name, value], index) => (
                <p
                  key={name}
                  className={`w-full pb-1 text-xs font-light flex items-center gap-2 justify-between ${index === Object.keys(growthSection).length - 1 ? "" : "border-b border-b-[#40404F] mb-2"}`}
                >
                  <span>{name}</span>
                  <span>{value}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Show More Button */}
      {(canScroll || divExpanded) && (
        <button
          className="absolute bottom-1 left-1/2 -translate-x-1/2 font-light hover:underline md:hidden transition focus:outline-none hover:cursor-pointer duration-200"
          onClick={() => setDivExpanded((prev) => !prev)}
        >
          {divExpanded ? "Hide" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default CompanyBreakDown;
