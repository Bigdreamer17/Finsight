import Image from "next/image";
import type { companyIdType, companyType } from "./types";
import Link from "next/link";
import { fetchCompanyById } from "@/app/lib/fetchs/get-company";
import { BiLinkExternal } from "react-icons/bi";

const CompanyDetail = async ({ companyId }: companyIdType) => {
  const company: companyType = await fetchCompanyById({ companyId });

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

            {company?.stock_name !== null &&
              company?.stock_name !== undefined &&
              company?.stock_name !== "" && (
                <h2 className="text-sm font-light">{company.stock_name}</h2>
              )}
          </div>
        </div>
      </div>
      <div className="p-2 rounded-lg flex items-center bg-[#2C2C35] shrink-0 basis-1/3 justify-between">
        <div className="flex flex-col gap-2 justify-center self-stretch">
          {company.stock_price !== null &&
            company.stock_price !== undefined && (
              <p className="font-semibold">{company.stock_price} Birr</p>
            )}

          {company?.swift_code !== null &&
            company?.swift_code !== undefined &&
            company?.swift_code !== "" && (
              <h2 className="font-medium">{company.swift_code}</h2>
            )}
        </div>

        <Link
          href={company.website ?? ""}
          className="p-1 hover:bg-[#40404F] rounded-md ml-auto"
          rel="noopener noreferrer"
          target="_blank"
        >
          <BiLinkExternal size={20} />
        </Link>
      </div>
    </div>
  );
};

export default CompanyDetail;
