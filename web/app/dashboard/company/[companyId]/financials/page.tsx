import IncomeStatement from "@/app/ui/dashboard/company/financials/income-statement";
import {
  ParsedSearchParams,
  searchParamsCache,
} from "@/app/ui/dashboard/search-params";

const FinancialsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ companyId: string }>;
  searchParams: ParsedSearchParams;
}) => {
  const { companyId } = await params;
  const { metric } = await searchParamsCache.parse(searchParams);

  return <IncomeStatement companyId={companyId} metric={metric} />;
};

export default FinancialsPage;
