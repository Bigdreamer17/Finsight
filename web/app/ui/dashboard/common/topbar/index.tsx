import TopbarContainer from "./TopbarContainer";
import { fetchCompanies } from "@/app/lib/fetchs/get-company";
import { companyType } from "../../company/common/types";

const Topbar = async () => {
  const companies: companyType[] = await fetchCompanies();

  return <TopbarContainer companies={companies} />;
};

export default Topbar;
