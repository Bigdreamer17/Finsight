import { fetchCompanies } from "@/app/lib/fetchs/get-company";
import CompaniesContainer from "./CompaniesContainer";
import type { companyType } from "../dashboard/company/common/types";

const Companies = async () => {
  const companies: companyType[] = await fetchCompanies();
  const filteredCompanies = companies.filter(
    (company) => company.image_url !== "" && company.image_url !== null,
  );
  return <CompaniesContainer companies={filteredCompanies} />;
};

export default Companies;
