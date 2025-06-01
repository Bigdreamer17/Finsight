import Dashboard from "../ui/dashboard";
import {
  ParsedSearchParams,
  searchParamsCache,
} from "@/app/ui/dashboard/search-params";

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: ParsedSearchParams;
}) => {
  const { sortMetric, sortParam } = await searchParamsCache.parse(searchParams);

  return <Dashboard sortMetric={sortMetric} sortParam={sortParam} />;
};

export default DashboardPage;
