import { fetchCompaniesDashboard } from "@/app/lib/fetchs/get-company";
import TableContainer from "./TableContainer";
import type { companyDashboard, sortParamMetricType } from "./types";

const Table = async ({ sortParam, sortMetric }: sortParamMetricType) => {
  const companies: companyDashboard[] = await fetchCompaniesDashboard({
    sortParam,
    sortMetric: sortMetric.toLowerCase(),
  });

  return <TableContainer comp={companies} />;
};

export default Table;
