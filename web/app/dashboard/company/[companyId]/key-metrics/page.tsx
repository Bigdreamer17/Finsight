import KeyMetrics from "@/app/ui/dashboard/company/key-metrics";

const KeyMetricsPage = ({ params }: { params: { companyId: string } }) => {
  const { companyId } = params;

  return <KeyMetrics companyId={companyId} />;
};

export default KeyMetricsPage;
