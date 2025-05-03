export type companyType = {
  name: string;
  stockName: string;
  companyId: string;
  imageUrl: string;
};

export type searchProps = {
  paginationQuery?: string;
  companies: companyType[];
};
