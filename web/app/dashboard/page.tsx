import Dashboard from "../ui/dashboard";
import {
  ParsedSearchParams,
  searchParamsCache,
} from "../ui/dashboard/search-params";

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: ParsedSearchParams;
}) => {
  const { company, metric, companyFilter } =
    await searchParamsCache.parse(searchParams);

  return (
    <Dashboard
      company={company}
      metric={metric}
      companyFilter={companyFilter}
    />
  );
};

export default DashboardPage;
