import { Suspense } from "react";
import SearchCompany from "./SearchCompany";
import SearchMetric from "./SearchMetric";
import Table from "./Table";
import TableSkeleton from "./TableSkeleton";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./DashboardErrorFallback";
import type { sortParamMetricType } from "./types";

const Dashboard = ({ sortParam, sortMetric }: sortParamMetricType) => {
  return (
    <div className="rounded-lg flex-1 bg-[#2C2C35] p-4 flex flex-col gap-2.5">
      <div className="flex flex-wrap gap-4 items-center">
        <SearchMetric />

        <SearchCompany />
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Table sortParam={sortParam} sortMetric={sortMetric} />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};

export default Dashboard;
