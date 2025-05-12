export const incomeStatementMetrics = [
  { name: "total revenue", isPaidFeature: false },
  { name: "cost of goods sold", isPaidFeature: false },
  { name: "gross profit", isPaidFeature: false },
  { name: "total operating expenses", isPaidFeature: false },
];

export const fieldsMap: { [key: string]: string } = {
  "total revenue": "totalRevenue",
  "cost of goods sold": "costOfGoodsSold",
  "gross profit": "grossProfit",
  "total operating expenses": "totalOperatingExpenses",
};
