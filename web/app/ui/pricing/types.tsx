import type { ReactNode, RefObject } from "react";

export type billingType = "Free" | "Pro";

export type billingOption = {
  type: billingType;
  price?: number;
  subHeading: string;
  separator: string;
  services: string[];
};

export type billingCardProps = {
  ref: RefObject<HTMLElement | null>;
} & billingOption;

export type servicesType = { [key: string]: string | number | ReactNode };

export type responseType = {
  checkout_url: string;
  tx_ref: string;
};
