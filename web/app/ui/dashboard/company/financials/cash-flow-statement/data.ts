import { metricType } from "../../../types";

export const cashFlowMetrics: metricType[] = [
  {
    name: "cash_generated_from_operations",
    grouping: "net_cash_from_operating_activities",
  },
  {
    name: "income_tax_paid",
    grouping: "net_cash_from_operating_activities",
  },
  {
    name: "defined_benefits_paid",
    grouping: "net_cash_from_operating_activities",
  },
  {
    name: "directors_remuneration_paid",
    grouping: "net_cash_from_operating_activities",
  },
  { name: "net_cash_from_operating_activities", isLast: true },

  {
    name: "net_investment_bills_bonds",
    grouping: "net_cash_from_investing_activities",
  },
  {
    name: "purchase_of_shares",
    grouping: "net_cash_from_investing_activities",
  },
  {
    name: "purchase_of_intangible_assets",
    grouping: "net_cash_from_investing_activities",
  },
  {
    name: "purchase_of_property_and_equipment",
    grouping: "net_cash_from_investing_activities",
  },
  {
    name: "payment_for_right_of_use_assets",
    grouping: "net_cash_from_investing_activities",
  },
  {
    name: "proceeds_from_sale_of_property_equipment",
    grouping: "net_cash_from_investing_activities",
  },
  { name: "net_cash_from_investing_activities", isLast: true },

  {
    name: "dividends_paid",
    grouping: "net_cash_from_financing_activities",
  },
  {
    name: "proceeds_from_issued_shares",
    grouping: "net_cash_from_financing_activities",
  },
  { name: "net_cash_from_financing_activities", isLast: true },

  {
    name: "cash_equivalents_at_start",
    grouping: "cash_and_balances_at_end",
  },
  { name: "cash_and_balances_at_end", isLast: true },

  { name: "net_increase_in_cash_equivalents" },
];

export const fieldsMap: { [key: string]: string } = {
  cash_generated_from_operations: "Cash Generated from Operations",
  income_tax_paid: "Income Tax Paid",
  defined_benefits_paid: "Defined Benefits Paid",
  directors_remuneration_paid: "Directors Remuneration Paid",
  net_cash_from_operating_activities: "Net Cash from Operating Activities",
  net_investment_bills_bonds:
    "Net (Investment) / Collection of Bills and Bonds",
  purchase_of_shares: "Purchase of Shares",
  purchase_of_intangible_assets: "Purchase of Intangible Assets",
  purchase_of_property_and_equipment: "Purchase of Property and Equipment",
  payment_for_right_of_use_assets: "Payment for right-of-use Assets",
  proceeds_from_sale_of_property_equipment:
    "Proceeds from Sale of Property and Equipment",
  net_cash_from_investing_activities: "Net Cash (used in) Investing Activities",
  dividends_paid: "Dividends Paid",
  proceeds_from_issued_shares: "Proceeds from Issued Shares",
  net_cash_from_financing_activities: "Net Cash from Financing Activities",
  cash_equivalents_at_start: "Cash Equivalents at Start",
  cash_and_balances_at_end: "Cash Equivalents at End",
  net_increase_in_cash_equivalents: "Net Increase in Cash and Cash Equivalents",
};
