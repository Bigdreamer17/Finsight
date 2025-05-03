import IndustryNews from "@/app/ui/dashboard/company/industry-news";

const IndustryNewsPage = async ({
  params,
}: {
  params: { companyId: string };
}) => {
  const { companyId } = params;

  return <IndustryNews companyId={companyId} />;
};

export default IndustryNewsPage;
