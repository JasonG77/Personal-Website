import { AboutSection } from "../components/AboutSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { PageShell } from "../components/system/PageShell";

export const AboutPage = () => (
  <PageShell>
    <AboutSection />
    <ExperienceSection />
  </PageShell>
);
