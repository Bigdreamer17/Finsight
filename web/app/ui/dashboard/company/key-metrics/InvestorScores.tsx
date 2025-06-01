import InvestorScoreCard from "./InvestorScoreCard";
import type { investorScoresType } from "./types";

const InvestorScores = ({
  warren_buffett,
  peter_lynch,
  benjamin_graham,
}: investorScoresType) => {
  return (
    <div className="rounded-lg bg-[#2C2C35] p-4 flex flex-col gap-4">
      <h3 className="text-xl font-medium flex">Investor Scores:</h3>

      <div className="flex flex-col md:items-center md:flex-row md:flex-wrap pb-6 gap-4">
        <InvestorScoreCard
          name="Warren Buffett"
          imageUrl="/buffett.png"
          {...warren_buffett}
        />
        <InvestorScoreCard
          name="Peter Lynch"
          imageUrl="/lynch.jpeg"
          {...peter_lynch}
        />
        <InvestorScoreCard
          name="Benjamin Graham"
          imageUrl="/graham.jpg"
          {...benjamin_graham}
        />
      </div>
    </div>
  );
};

export default InvestorScores;
