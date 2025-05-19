const CompanyBreakDownSkeleton = () => {
  const overviewSection = ["Name", "CEO", "Website", "Sector", "Year Founded"];

  const profileSection = [
    "Market Cap",
    "EV",
    "Shares Out",
    "Revenue",
    "Employees",
  ];

  const valuationSection = [
    "P/E",
    "P/B",
    "EV/Sales",
    "EV/EBITDA",
    "P/FCF",
    "EV/Gross Profit",
  ];

  const growthSection = [
    "Rev 3Yr",
    "Rev 5Yr",
    "Rev 10Yr",
    "Dil EPS 3Yr",
    "Dil EPS 5Yr",
    "Dil EPS 10Yr",
    "Rev Fwd 2Yr",
  ];

  const marginSection = [
    "Gross",
    "EBITDA",
    "Operating",
    "Pre-Tax",
    "Net",
    "FCF",
  ];

  const returnsSection = ["ROA", "ROTA", "ROE", "ROCE", "ROIC"];

  const dividendsSection = [
    "Yield",
    "Payout",
    "DPS",
    "DPS Growth 3Yr",
    "DPS Growth 5Yr",
  ];
  return (
    <div
      className={`z-0 rounded-lg shrink-0 flex flex-col gap-2 basis-1/2 grow-0 `}
    >
      <div className="flex flex-col gap-2">
        <div className="rounded-lg bg-[#2C2C35] flex flex-col gap-2 p-4 basis-1/2 max-h-fit">
          <h3 className="font-semibold text-lg">Company Overview</h3>

          {/* Description */}
          <div className="mb-3">
            <p
              className={`overflow-hidden transition-[max-height] mb-2 duration-500 ease-in-out leading-relaxed text-sm text-[#AFAFB6] bg-[#40404F] h-16 rounded-md w-full animate-pulse`}
            ></p>

            <div className="font-light hover:underline transition focus:outline-none hover:cursor-pointer duration-200 h-5 bg-[#40404F] animate-pulse w-20 rounded-md"></div>
          </div>

          {/* Company Overview Section */}
          {overviewSection.map((name) => (
            <p
              key={name}
              className="w-full pb-1 text-xs flex items-center gap-2 justify-between border-b border-b-[#40404F]"
            >
              <span>{name}</span>
              <span className="h-full w-32 animate-pulse bg-[#40404F] rounded-md"></span>
            </p>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-3 bg-[#2C2C35] p-4 rounded-md transition-all duration-300 ease-in-out">
          <h3 className="font-semibold mb-2 text-lg sm:col-span-2 md:col-span-3">
            Company Statistics
          </h3>

          <div className="flex flex-col gap-4">
            {/* Profile Section */}
            <div>
              <h4 className="font-medium text-sm mb-3">Profile</h4>

              {profileSection.map((name, index) => (
                <p
                  key={name}
                  className={`w-full pb-1 text-xs font-light flex items-center gap-2 justify-between ${index === Object.keys(profileSection).length - 1 ? "" : "border-b border-b-[#40404F] mb-2"}`}
                >
                  <span>{name}</span>
                  <span className="h-4 w-14 rounded-md animate-pulse bg-[#40404F]"></span>
                </p>
              ))}
            </div>

            {/* Margin Section */}
            <div>
              <h4 className="font-medium text-sm mb-3">Margin</h4>

              {marginSection.map((name, index) => (
                <p
                  key={name}
                  className={`w-full pb-1 text-xs font-light flex items-center gap-2 justify-between ${index === Object.keys(profileSection).length - 1 ? "" : "border-b border-b-[#40404F] mb-2"}`}
                >
                  <span>{name}</span>
                  <span className="h-4 w-14 rounded-md animate-pulse bg-[#40404F]"></span>
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Valuation Section */}
            <div>
              <h4 className="font-medium text-sm mb-3">Valuation</h4>

              {valuationSection.map((name, index) => (
                <p
                  key={name}
                  className={`w-full pb-1 text-xs font-light flex items-center gap-2 justify-between ${index === Object.keys(valuationSection).length - 1 ? "" : "border-b border-b-[#40404F] mb-2"}`}
                >
                  <span>{name}</span>
                  <span className="h-4 w-14 rounded-md animate-pulse bg-[#40404F]"></span>
                </p>
              ))}
            </div>

            {/* Returns Section */}
            <div>
              <h4 className="font-medium text-sm mb-3">Returns</h4>

              {returnsSection.map((name, index) => (
                <p
                  key={name}
                  className={`w-full pb-1 text-xs font-light flex items-center gap-2 justify-between ${index === Object.keys(profileSection).length - 1 ? "" : "border-b border-b-[#40404F] mb-2"}`}
                >
                  <span>{name}</span>
                  <span className="h-4 w-14 rounded-md animate-pulse bg-[#40404F]"></span>
                </p>
              ))}
            </div>
          </div>

          <div className="md:flex md:flex-col sm:grid sm:grid-cols-2 flex flex-col gap-4 sm:col-span-2 md:col-span-1">
            {/* Growth Section */}
            <div>
              <h4 className="font-medium text-sm mb-3">Growth</h4>

              {growthSection.map((name, index) => (
                <p
                  key={name}
                  className={`w-full pb-1 text-xs font-light flex items-center gap-2 justify-between ${index === Object.keys(growthSection).length - 1 ? "" : "border-b border-b-[#40404F] mb-2"}`}
                >
                  <span>{name}</span>
                  <span className="h-4 w-14 rounded-md animate-pulse bg-[#40404F]"></span>
                </p>
              ))}
            </div>

            {/* Dividends Section */}
            <div>
              <h4 className="font-medium text-sm mb-3">Dividends</h4>

              {dividendsSection.map((name, index) => (
                <p
                  key={name}
                  className={`w-full pb-1 text-xs font-light flex items-center gap-2 justify-between ${index === Object.keys(growthSection).length - 1 ? "" : "border-b border-b-[#40404F] mb-2"}`}
                >
                  <span>{name}</span>
                  <span className="h-4 w-14 rounded-md animate-pulse bg-[#40404F]"></span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyBreakDownSkeleton;
