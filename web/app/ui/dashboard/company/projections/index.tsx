import { fetchCompanyProjections } from "@/app/lib/fetchs/get-projections";
import type { companyIdType } from "../common/types";
import ProjectionsContainer from "./ProjectionsContainer";

const Projections = async ({ companyId }: companyIdType) => {
  const projections = await fetchCompanyProjections({
    companyId,
  });

  console.dir({ projections });

  return <ProjectionsContainer projectionData={projections} />;
};

export default Projections;
