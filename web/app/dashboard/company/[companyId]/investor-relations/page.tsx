import InvestorRelations from "@/app/ui/dashboard/company/investor-relations";
import {
  ParsedSearchParams,
  searchParamsCache,
} from "@/app/ui/dashboard/search-params";

const InvestorRelationsPage = async ({
  params,
  searchParams,
}: {
  params: { companyId: string };
  searchParams: ParsedSearchParams;
}) => {
  const { companyId } = params;
  const { sortMetric, sortParam, table } =
    await searchParamsCache.parse(searchParams);

  return (
    <InvestorRelations
      companyId={companyId}
      sortMetric={sortMetric}
      sortParam={sortParam}
      table={table}
    />
  );
};

export default InvestorRelationsPage;
