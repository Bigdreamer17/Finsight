import Charting from "@/app/ui/dashboard/charting";
import ChartingSkeleton from "@/app/ui/dashboard/charting/ChartingSkeleton";
import { Suspense } from "react";

const ChartingPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <Suspense fallback={<ChartingSkeleton />}>
      <Charting companyId={companyId} />
    </Suspense>
  );
};

export default ChartingPage;
