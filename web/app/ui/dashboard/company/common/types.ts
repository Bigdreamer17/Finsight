export type navigationType = {
  href: string;
  name: string;
  isActive: boolean;
};

export type companyIdType = {
  companyId: string;
};

export type companyType = {
  image_url: string;
  ceo?: string;
  description?: string;
  email?: string;
  id?: string;
  name?: string;
  phone?: string;
  po_box?: string;
  sector?: string;
  stock_name?: string;
  stock_price?: string;
  swift_code?: string;
  website?: string;
  year_founded?: string;
};
