"use client";

import Image from "next/image";
import { Fragment } from "react";

import { motion } from "framer-motion";

const Companies = () => {
  return (
    <section className="overflow-x-hidden relative whitespace-nowrap">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="w-full no-scrollbar my-20 flex items-center gap-10"
      >
        {[...Array(2)].map((_, loopIndex) => (
          <Fragment key={loopIndex}>
            {[...Array(10)].map((_, index) => (
              <Image
                key={index}
                src="https://finchat.io/cdn-cgi/image/width=640/assets/finchat-logos/finchat-logo-wordmark-light.png"
                alt="finsight logo"
                width={300}
                height={300}
              />
            ))}
          </Fragment>
        ))}
      </motion.div>
    </section>
  );
};

export default Companies;
