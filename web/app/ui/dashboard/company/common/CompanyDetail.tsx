import Image from "next/image";
import type { companyIdType } from "./types";
import { CgTranscript } from "react-icons/cg";
import Link from "next/link";

const CompanyDetail = async ({ companyId }: companyIdType) => {
  interface comp {
    name: string;
    stockName?: string;
    stockPrice: number;
  }
  const companyDet: { [key: string]: comp } = {
    "123": {
      name: "Dashen bank",
      stockPrice: 391.16,
    },
  };

  const company = companyDet[companyId];

  return (
    <div className="px-4 flex flex-col sm:flex-row items-stretch gap-3 mb-2.5">
      <div className="p-2 rounded-lg bg-[#2C2C35] grow">
        <div className="flex items-center gap-2.5">
          <Image
            src="https://media.glassdoor.com/sql/525842/dashen-bank-squarelogo-1461672481507.png"
            alt="company image"
            height={46}
            width={46}
            className="object-cover rounded-md"
          />

          <div className="flex flex-col self-start">
            <h1 className="font-semibold text-xl sm:text-2xl">
              {company.name}
            </h1>

            {company?.stockName !== null &&
              company?.stockName !== "" &&
              typeof company?.stockName === "string" && (
                <h2 className="text-sm font-light">{company.stockName}</h2>
              )}
          </div>
        </div>
      </div>
      <div className="p-2 rounded-lg flex items-center bg-[#2C2C35] shrink-0 basis-1/3 justify-between">
        <p className="font-semibold">{company.stockPrice} Birr</p>

        <Link
          href={"https://google.com"}
          className="p-1 hover:bg-[#40404F] rounded-md"
          rel="noopener noreferrer"
          target="_blank"
        >
          <CgTranscript size={20} />
        </Link>
      </div>
    </div>
  );
};

export default CompanyDetail;
