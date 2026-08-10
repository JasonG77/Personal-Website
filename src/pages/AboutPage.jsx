import { AboutSection } from "../components/AboutSection";
import { BuildingGoalsSection, EngineeringFocusSection } from "../components/ArchiveDetails";
import { SkillsExperienceSection } from "../components/SkillsSection";
import { PageShell } from "../components/system/PageShell";

export const AboutPage = () => (
  <PageShell>
    <AboutSection />
    <SkillsExperienceSection />
    <EngineeringFocusSection />
    <BuildingGoalsSection />
  </PageShell>
);
