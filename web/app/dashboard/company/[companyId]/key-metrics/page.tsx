import KeyMetrics from "@/app/ui/dashboard/company/key-metrics";

const KeyMetricsPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return <KeyMetrics companyId={companyId} />;
};

export default KeyMetricsPage;
