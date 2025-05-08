"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";

const Footer = () => {
  const pathName = usePathname();
  const newsletterRef = useRef<HTMLInputElement>(null);

  const footerItems = [
    {
      name: "Company",
      subItems: [
        { name: "LinkedIn", link: "/" },
        { name: "Twitter/X", link: "/" },
        { name: "Contact", link: "/" },
      ],
    },
    {
      name: "Product",
      subItems: [{ name: "Pricing", link: "/pricing" }],
    },
    {
      name: "Resources",
      subItems: [{ name: "Newsletter", link: "" }],
    },
  ];

  const handleNewsletterClick = () => {
    if (newsletterRef.current) {
      newsletterRef.current.focus();
    }
  };

  return (
    <footer className="w-full bg-[#f9f8f6]">
      <div className="flex flex-col gap-4 max-w-[1140px] mx-auto pb-20">
        <div className="flex items-center flex-wrap px-4 sm:px-20 py-30 justify-between gap-10 rounded-3xl bg-white">
          {/* email section */}
          <div className="flex flex-col gap-5 max-w-80 mx-auto">
            <h3 className="text-4xl">Stay informed with our newsletter</h3>

            <p className="text-[#777169] opacity-50 text-sm font-semibold">
              Weekly earnings, insights, research and news
            </p>

            <div className="bg-[#e8e6e3] p-2 rounded-full flex items-center gap-2">
              <div className="p-1 rounded-full bg-white grid place-items-center">
                <IoIosArrowUp className="text-[#777169]" size={20} />
              </div>

              <input
                type="email"
                className="w-full placeholder:text-black/60 placeholder:text-sm focus:outline-none"
                placeholder="Enter your email"
                ref={newsletterRef}
              />
            </div>
          </div>

          {/* footer items */}
          <div className="flex gap-10 flex-wrap text-center mx-auto">
            {footerItems.map((item) => (
              <div key={item.name} className="flex flex-col gap-3">
                <h4 className="font-semibold uppercase text-[#777169] opacity-50">
                  {item.name}
                </h4>

                <ul className="flex flex-col gap-2 text-start">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.name} className="hover:opacity-70">
                      {item.name === "Resources" ? (
                        <button
                          className="hover:cursor-pointer"
                          onClick={handleNewsletterClick}
                        >
                          {subItem.name}
                        </button>
                      ) : (
                        <Link href={subItem.link}>{subItem.name}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center sm:justify-between px-2.5 gap-10 flex-wrap items-center text-xs text-[#777169] font-medium">
          <div className="flex items-center gap-5 flex-wrap justify-center">
            <div className="flex items-center">
              <p className="pr-2">Privacy Policy</p>

              <p className="pl-2 border-l-[0.5px] leading-3 border-[#777169]/50">
                Terms of Service
              </p>
            </div>

            <p>
              &copy; {new Date().getFullYear()} Finsight. All rights reserved
            </p>
          </div>

          {/* social media icons */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <FaLinkedinIn size={18} />
            </Link>

            <Link href="/">
              <FaXTwitter size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
