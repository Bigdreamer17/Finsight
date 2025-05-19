import InvestorRelations from "@/app/ui/dashboard/company/investor-relations";
import InvestorRelationsSkeleton from "@/app/ui/dashboard/company/investor-relations/InvestorRelationsSkeleton";
import {
  ParsedSearchParams,
  searchParamsCache,
} from "@/app/ui/dashboard/search-params";
import { Suspense } from "react";

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
      <InvestorRelations
        companyId={companyId}
        sortMetric={sortMetric}
        sortParam={sortParam}
        table={table}
      />
    </Suspense>
  );
};

export default InvestorRelationsPage;
