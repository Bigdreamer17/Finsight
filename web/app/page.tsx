import { ErrorBoundary } from "react-error-boundary";
import Cards from "./ui/landing-page/Cards";
import Companies from "./ui/landing-page/Companies";
import Footer from "./ui/landing-page/Footer";
import Hero from "./ui/landing-page/Hero";
import Navbar from "./ui/landing-page/Navbar";
import Research from "./ui/landing-page/Research";
import { Suspense } from "react";
import CompaniesFallback from "./ui/landing-page/CompaniesFallback";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-[#f9f8f6]">
        <Navbar />

        <Hero />

        <Suspense fallback={<></>}>
          <ErrorBoundary FallbackComponent={CompaniesFallback}>
            <Companies />
          </ErrorBoundary>
        </Suspense>

        <Research />

        <Cards />
      </main>

      <Footer />
    </>
  );
}
