import type { companyType } from "../../company/common/types";

export type searchProps = {
  paginationQuery?: string;
  companies: companyType[];
};
