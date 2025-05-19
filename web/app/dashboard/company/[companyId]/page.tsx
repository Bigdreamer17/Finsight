import CompanyOverview from "@/app/ui/dashboard/company/overview";

const OverviewPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return <CompanyOverview companyId={companyId} />;
};

export default OverviewPage;
