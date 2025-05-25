import InvestorRelations from "@/app/ui/dashboard/company/investor-relations";
import InvestorRelationsSkeleton from "@/app/ui/dashboard/company/investor-relations/InvestorRelationsSkeleton";
import ErrorFallback from "@/app/ui/dashboard/DashboardErrorFallback";
import {
  ParsedSearchParams,
  searchParamsCache,
} from "@/app/ui/dashboard/search-params";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const InvestorRelationsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ companyId: string }>;
  searchParams: ParsedSearchParams;
}) => {
  const { companyId } = await params;
  const { sortMetric, sortParam, table } =
    await searchParamsCache.parse(searchParams);

  return (
    <Suspense fallback={<InvestorRelationsSkeleton />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <InvestorRelations
          companyId={companyId}
          sortMetric={sortMetric}
          sortParam={sortParam}
          table={table}
        />
      </ErrorBoundary>
    </Suspense>
  );
};

export default InvestorRelationsPage;
