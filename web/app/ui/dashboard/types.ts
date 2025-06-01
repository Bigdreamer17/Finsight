import type { companyIdType } from "./company/common/types";

export type dashboardProps = {
  company?: string;
  metric?: string;
  companyFilter?: string;
};

export type searchProps = {
  paginationQuery?: string;
};

export type metricType = {
  name: string;
  isPaidFeature?: boolean;
  isLast?: boolean;
  grouping?: string;
  isNotSort?: boolean;
};

export type companyDashboard = {
  name: string;
  sector?: string;
  roe?: number;
  eps?: number;
  debt_to_equity?: number;
  profit_margin?: number;
};

export type TableProps = {
  comp: companyDashboard[];
};

export type senderType = "user" | "bot";

export type chatType = {
  id?: string;
  user_id: string;
  company_id: string;
  chat: string;
  sender: senderType;
  created_at: Date;
};

export type chatBotProps = companyIdType & {
  chatsData: chatType[];
};

export type sortParamMetricType = {
  sortParam: string;
  sortMetric: string;
};
