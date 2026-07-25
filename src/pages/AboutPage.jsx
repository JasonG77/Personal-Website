import { Navbar } from "../components/Navbar";
import { AboutSection } from "../components/AboutSection";
import { AcademicExperience, AspirationsSection } from "../components/ArchiveDetails";
import { SkillsSection } from "../components/SkillsSection";
import { Footer } from "../components/Footer";

export const AboutPage = () => (
  <div className="page-shell">
    <Navbar />
    <main className="inner-page">
      <AboutSection />
      <AcademicExperience />
      <SkillsSection />
      <AspirationsSection />
    </main>
    <Footer />
  </div>
);
