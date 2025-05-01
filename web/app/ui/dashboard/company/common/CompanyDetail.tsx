import Image from "next/image";
import type { companyIdType } from "./types";

const CompanyDetail = ({ companyId }: companyIdType) => {
  interface comp {
    name: string;
    stockName: string;
    stockPrice: number;
  }
  const companyDet: { [key: string]: comp } = {
    "123": {
      name: "Microsoft Corporation",
      stockName: "NasdaqGS-MSFT",
      stockPrice: 391.16,
    },
  };

  const company = companyDet[companyId];

  return (
    <div className="px-4 flex flex-col sm:flex-row items-stretch gap-3 mb-2.5">
      <div className="p-2 rounded-lg bg-[#2C2C35] grow">
        <div className="flex items-center gap-2.5">
          <Image
            src="https://cdn.finchat.io/21835.png"
            alt="company image"
            height={46}
            width={46}
            className="object-cover rounded-md"
          />

          <div className="flex flex-col self-start">
            <h1 className="font-semibold text-xl sm:text-2xl">
              {company.name}
            </h1>
            <h2 className="text-sm font-light">{company.stockName}</h2>
          </div>
        </div>
      </div>
      <div className="p-2 rounded-lg flex items-center bg-[#2C2C35] shrink-0 basis-1/3">
        <p className="font-semibold">${company.stockPrice}</p>
      </div>
    </div>
  );
};

export default CompanyDetail;
