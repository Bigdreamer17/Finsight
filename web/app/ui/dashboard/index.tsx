import SearchCompany from "./SearchCompany";
import SearchMetric from "./SearchMetric";
import Table from "./Table";

const Dashboard = () => {
  return (
    <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col gap-2.5">
      <div className="flex flex-wrap gap-4 items-center">
        <SearchMetric />

        <SearchCompany />
      </div>

      <Table />
    </div>
  );
};

export default Dashboard;
