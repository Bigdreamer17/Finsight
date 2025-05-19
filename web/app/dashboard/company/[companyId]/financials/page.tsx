import IncomeStatement from "@/app/ui/dashboard/company/financials/income-statement";

const FinancialsPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return <IncomeStatement companyId={companyId} />;
};

export default FinancialsPage;
