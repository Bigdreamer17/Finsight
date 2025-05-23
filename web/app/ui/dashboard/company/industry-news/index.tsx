import type { companyIdType } from "../common/types";
import NewsCard from "./NewsCard";
import type { newsType } from "./type";

const IndustryNews = ({ companyId }: companyIdType) => {
  interface comp {
    finance: newsType[];
  }
  const companyData: { [key: string]: comp } = {
    "2d12ea5a-dce7-4722-8014-bf596514cbe7": {
      finance: [
        {
          title: "AI Startup Raises $50M to Revolutionize Healthcare",
          description:
            "A new AI-powered platform aims to streamline diagnostics and improve patient outcomes, securing major VC backing in its Series B round.",
          imageUrl: "https://cdn.finchat.io/21835.png",
        },
        {
          title: "Quibim Raises $50M to Advance AI-Powered Medical Imaging",
          description:
            "Spanish healthtech startup Quibim has secured $50 million in Series A funding to accelerate the development of its AI-driven imaging biomarker technology. The investment aims to enhance precision medicine by transforming medical imaging data into actionable insights, aiding in the diagnosis and treatment of various diseases.",
          imageUrl: "https://picsum.photos/200/300?grayscale",
        },
      ],
    },
  };
  const companyNews = companyData[companyId];

  return (
    <div className="mt-5 flex flex-col gap-3">
      <h3 className="text-xl font-medium px-4">
        Latest news stories in this sector
      </h3>

      <div className="rounded-lg bg-[#2C2C35] px-4 pt-4 pb-10 flex flex-col gap-4">
        {Object.entries(companyNews).map(([name, news], index) => (
          <div key={index} className="flex flex-col gap-5">
            <h4 className="text-xl font-medium">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </h4>

            {news.map((n: newsType, idx: number) => (
              <NewsCard key={idx} {...n} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryNews;
