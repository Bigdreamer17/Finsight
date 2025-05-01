import CompanyOverview from "@/app/ui/dashboard/company/overview";

const OverviewPage = ({ params }: { params: { companyId: string } }) => {
  const { companyId } = params;
  return <CompanyOverview companyId={companyId} />;
};

export default OverviewPage;
