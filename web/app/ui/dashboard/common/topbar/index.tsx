import type { companyType } from "./types";
import TopbarContainer from "./TopbarContainer";

const Topbar = async () => {
  const companies: companyType[] = [
    {
      companyId: "123",
      name: "Wegagen bank",
      stockName: "Wegagen bank",
      imageUrl: "https://cdn.finchat.io/21835.png",
    },
    {
      companyId: "123",
      name: "Dashen bank",
      stockName: "Dashen bank",
      imageUrl:
        "https://media.glassdoor.com/sql/525842/dashen-bank-squarelogo-1461672481507.png",
    },
    {
      companyId: "123",
      name: "Neged bank",
      stockName: "Neged bank",
      imageUrl: "https://cdn.finchat.io/21835.png",
    },
    {
      companyId: "123",
      name: "Birhan bank",
      stockName: "Birhan bank",
      imageUrl: "https://cdn.finchat.io/21835.png",
    },
  ];

  return <TopbarContainer companies={companies} />;
};

export default Topbar;
