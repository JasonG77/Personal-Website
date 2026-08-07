import { ArrowUpRight, Mail } from "lucide-react";
import { ActionButton, ArchiveHeader, ContentCard, MetaLabel, PageContainer } from "./system/DesignSystem";

const links = [
  ["EMAIL", "mailto:jasongutierrez318@gmail.com", "jasongutierrez318@gmail.com"],
  ["LINKEDIN", "https://www.linkedin.com/in/jason-gutierrez7/", "jason-gutierrez7"],
  ["GITHUB", "https://github.com/JasonG77", "JasonG77"],
];

export const ContactSection = () => (
  <section id="contact" className="archive-section contact-archive">
    <PageContainer>
      <ArchiveHeader
        number="07"
        label="CONTACT"
        title="Let’s make something useful."
        intro="For engineering opportunities, project conversations, or work focused on equitable technology."
      />

      <div className="contact-card-grid">
        {links.map(([label, href, value]) => (
          <ContentCard
            as="a"
            className="contact-card"
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
          >
            <MetaLabel>{label}</MetaLabel>
            <strong>{value}</strong>
            <ArrowUpRight aria-hidden="true" />
          </ContentCard>
        ))}
      </div>

      <div className="contact-cta-row">
        <ActionButton href="mailto:jasongutierrez318@gmail.com"><Mail aria-hidden="true" /> Start a conversation</ActionButton>
        <MetaLabel>RÉSUMÉ / AVAILABLE BY REQUEST</MetaLabel>
      </div>
    </PageContainer>
  </section>
);
