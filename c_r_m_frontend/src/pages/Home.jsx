import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import AiAgentWorkforce from "../components/AiAgentWorkforce/AiAgentWorkforce";
import Features from "../components/Features/Features";
import Pricing from "../components/Pricing/Pricing";
import Statistics from "../components/Statistics/Statistics";
import AISection from "../components/AISection/AISection";
import PlotMasterplanMatrix from "../components/PlotMasterplanMatrix/PlotMasterplanMatrix";
import Workflow from "../components/Workflow/Workflow";
import DashboardPreview from "../components/DashboardPreview/DashboardPreview";
import Testimonials from "../components/Testimonials/Testimonials";
import FAQ from "../components/FAQ/FAQ";
import ContactCTA from "../components/ContactCTA/ContactCTA";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />
      <AiAgentWorkforce />
      <Features />
      <Pricing />
      <Statistics />
      <AISection />
      <PlotMasterplanMatrix />
      <Workflow />
      <DashboardPreview />
      <Testimonials />
      <FAQ />
      <ContactCTA />
      <Footer />
    </>
  );
}