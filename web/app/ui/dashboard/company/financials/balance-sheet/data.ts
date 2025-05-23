import { metricType } from "../../../types";

export const balanceSheetMetrics: metricType[] = [
  {
    name: "cash_balances",
    grouping: "total_assets",
  },
  {
    name: "reserve_nbe",
    grouping: "total_assets",
  },
  {
    name: "loans_advances_customers",
    grouping: "total_assets",
  },
  {
    name: "ifb_financing",
    grouping: "total_assets",
  },
  {
    name: "investment_fair_value",
    grouping: "total_assets",
  },
  {
    name: "investment_amortised_cost",
    grouping: "total_assets",
  },
  {
    name: "other_assets",
    grouping: "total_assets",
  },
  {
    name: "investment_properties",
    grouping: "total_assets",
  },
  {
    name: "intangible_assets",
    grouping: "total_assets",
  },
  {
    name: "property_equipment",
    grouping: "total_assets",
  },
  {
    name: "deferred_tax_assets",
    grouping: "total_assets",
  },
  { name: "total_assets", isLast: true },

  {
    name: "customer_deposits",
    grouping: "total_liabilities",
  },
  {
    name: "current_income_tax",
    grouping: "total_liabilities",
  },
  {
    name: "other_liabilities",
    grouping: "total_liabilities",
  },
  {
    name: "deferred_tax_liability",
    grouping: "total_liabilities",
  },
  {
    name: "defined_benefits_obligation",
    grouping: "total_liabilities",
  },
  { name: "total_liabilities", isLast: true },

  {
    name: "share_capital",
    grouping: "total_equity",
  },
  {
    name: "retained_earnings",
    grouping: "total_equity",
  },
  {
    name: "reserve_ifrs",
    grouping: "total_equity",
  },
  {
    name: "legal_reserve",
    grouping: "total_equity",
  },
  {
    name: "special_reserve",
    grouping: "total_equity",
  },
  {
    name: "regulatory_credit_risk_reserve",
    grouping: "total_equity",
  },
  {
    name: "share_premium",
    grouping: "total_equity",
  },
  {
    name: "other_reserves",
    grouping: "total_equity",
  },
  { name: "total_equity", isLast: true },
  { name: "total_liabilities_equity" },
];

export const fieldsMap: { [key: string]: string } = {
  cash_balances: "Cash and Balances with Banks",
  reserve_nbe: "Reserve with National Bank of Ethiopia",
  loans_advances_customers: "Loans and Advances to Customers",
  ifb_financing: "IFB Financing",
  investment_fair_value: "Financial Assets at Fair Value",
  investment_amortised_cost: "Debt Securities at Amortised Cost",
  other_assets: "Other Assets",
  investment_properties: "Investment Properties",
  intangible_assets: "Intangible Assets",
  property_equipment: "Property and Equipment",
  deferred_tax_assets: "Deferred Tax Assets",
  total_assets: "Total Assets",
  customer_deposits: "Customer Deposits",
  current_income_tax: "Current Income Tax",
  other_liabilities: "Other Liabilities",
  deferred_tax_liability: "Deferred Tax Liabilities",
  defined_benefits_obligation: "Defined Benefits Obligation",
  total_liabilities: "Total Liabilities",
  share_capital: "Share Capital",
  retained_earnings: "Retained Earnings",
  reserve_ifrs: "Reserve for IFRS",
  legal_reserve: "Legal Reserve",
  special_reserve: "Special Reserve",
  regulatory_credit_risk_reserve: "Regulatory Credit Risk Reserve",
  share_premium: "Share Premium",
  other_reserves: "Other Reserves",
  total_equity: "Total Equity",
  total_liabilities_equity: "Total Liabilities and Equity",
};
