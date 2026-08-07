import { AboutSection } from "../components/AboutSection";
import { AcademicExperience, AspirationsSection } from "../components/ArchiveDetails";
import { SkillsSection } from "../components/SkillsSection";
import { PageShell } from "../components/system/PageShell";

export const AboutPage = () => (
  <PageShell>
    <AboutSection />
    <AcademicExperience />
    <SkillsSection />
    <AspirationsSection />
  </PageShell>
);
