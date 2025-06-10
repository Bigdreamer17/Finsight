"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { companyType } from "../dashboard/company/common/types";

const CompaniesContainer = ({ companies }: { companies: companyType[] }) => {
  const repeatedCompanies = [
    ...companies,
    ...companies,
    ...companies,
    ...companies,
  ];

  return (
    <section className="relative w-full overflow-hidden mb-5">
      {/* Left gradient shadow */}
      <div className="absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-[#f9f8f6] to-transparent pointer-events-none" />
      {/* Right gradient shadow */}
      <div className="absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-[#f9f8f6] to-transparent pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap items-center gap-0 min-w-fit"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {repeatedCompanies.map((company, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[150px] h-[150px] mx-4 relative"
          >
            <Image
              src={company.image_url}
              alt={`${company.name} logo`}
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default CompaniesContainer;
