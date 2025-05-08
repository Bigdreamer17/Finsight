import Footer from "../ui/landing-page/Footer";
import Navbar from "../ui/landing-page/Navbar";
import CompairPlans from "../ui/pricing/CompairPlans";
import Hero from "../ui/pricing/Hero";

const PricingPage = () => {
  return (
    <>
      <main className="bg-[#151519] flex flex-col gap-5">
        <Navbar />

        <Hero />

        <CompairPlans />
      </main>

      <Footer />
    </>
  );
};

export default PricingPage;
