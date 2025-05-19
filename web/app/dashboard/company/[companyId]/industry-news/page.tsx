import IndustryNews from "@/app/ui/dashboard/company/industry-news";

const IndustryNewsPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return <IndustryNews companyId={companyId} />;
};

export default IndustryNewsPage;
