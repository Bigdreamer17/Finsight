import { metricType } from "../../../types";

export const incomeStatementMetrics: metricType[] = [
  {
    name: "employee_benefit_expense",
    isPaidFeature: true,
    grouping: "profit_before_tax",
  },
  {
    name: "other_operating_expenses",
    isPaidFeature: true,
    grouping: "profit_before_tax",
  },
  { name: "profit_before_tax", isPaidFeature: true, isLast: true },
  {
    name: "fees_commission_income",
    isPaidFeature: true,
    grouping: "net_fees_commission",
  },
  {
    name: "fees_commission_expense",
    isPaidFeature: true,
    grouping: "net_fees_commission",
  },
  { name: "net_fees_commission", isPaidFeature: true, isLast: true },
  {
    name: "interest_expense",
    isPaidFeature: true,
    grouping: "net_interest_income",
  },
  {
    name: "interest_income",
    isPaidFeature: true,
    grouping: "net_interest_income",
  },
  { name: "net_interest_income", isPaidFeature: true, isLast: true },
  {
    name: "loan_impairment_charge",
    isPaidFeature: true,
    grouping: "net_operating_income",
  },
  {
    name: "ifb_impairment",
    isPaidFeature: true,
    grouping: "net_operating_income",
  },
  {
    name: "other_financial_assets_impairment",
    isPaidFeature: true,
    grouping: "net_operating_income",
  },
  { name: "net_operating_income", isPaidFeature: true, isLast: true },
  {
    name: "other_operating_income",
    isPaidFeature: true,
    grouping: "total_operating_income",
  },
  {
    name: "gain_loss_forex",
    isPaidFeature: true,
    grouping: "total_operating_income",
  },
  { name: "total_operating_income", isLast: true },
  {
    name: "income_tax_expense",
    isPaidFeature: true,
    grouping: "profit_for_year",
  },
  { name: "profit_for_year", isPaidFeature: true, isLast: true },
  {
    name: "remeasurement_gain_fvtoci",
    isPaidFeature: true,
    grouping: "total_comprehensive_income",
  },
  {
    name: "remeasurement_loss_benefit_obligation",
    isPaidFeature: true,
    grouping: "total_comprehensive_income",
  },
  {
    name: "deferred_tax",
    isPaidFeature: true,
    grouping: "total_comprehensive_income",
  },
  { name: "total_comprehensive_income", isPaidFeature: true, isLast: true },
  { name: "total_oci", isPaidFeature: true },
  { name: "basic_eps", isPaidFeature: true },
  { name: "diluted_eps", isPaidFeature: true },
];

export const fieldsMap: { [key: string]: string } = {
  basic_eps: "Basic EPS",
  diluted_eps: "Diluted EPS",
  employee_benefit_expense: "Employee Benefits Expense",
  other_operating_expenses: "Other Operating Expenses",
  profit_before_tax: "Profit Before Income Tax",
  fees_commission_income: "Fees and Commission Income",
  fees_commission_expense: "Fees and Commission Expense",
  net_fees_commission: "Net Fees and Commission Income",
  interest_expense: "Interest Expense",
  interest_income: "Interest Income",
  net_interest_income: "Net Interest Income",
  loan_impairment_charge: "Loans Imparement/(Charge)",
  ifb_impairment: "Imparement Reversal/(Charge) on IFB Financing",
  other_financial_assets_impairment:
    "Imparement Reversal/(Losses) on Ohter Financial Assets",
  net_operating_income: "Net Operating Income",
  other_operating_income: "Other Operating Income",
  gain_loss_forex: "Gain/(Loss) on Foreign Exchange",
  total_operating_income: "Total Operating Income",
  income_tax_expense: "Income Tax Expense",
  profit_for_year: "Profit for the Year",
  remeasurement_gain_fvtoci: "Remeasurement Gain on Financial Assets at FVTOCI",
  remeasurement_loss_benefit_obligation:
    "Remeasurement (Loss)/Gain on Retirement Benefits Obligation",
  deferred_tax: "Deferred Tax",
  total_comprehensive_income: "Total Comprehensive Income for the Year",
  total_oci: "Total OCI",
};
