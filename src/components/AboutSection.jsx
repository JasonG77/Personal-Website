import { ArrowRight, FileText } from "lucide-react";
import { ActionButton, ArchiveHeader, ContentCard, MetaLabel, PageContainer } from "./system/DesignSystem";

const motivations = [
  {
    label: "ROOTS",
    title: "Houston to Stanford",
    body: "My first-generation journey, my family’s immigrant story, and my Guatemalan heritage shape who I build for and why access matters.",
  },
  {
    label: "MOTIVATION",
    title: "Education changes lives",
    body: "Learning opened doors in my life, so I want to help make those opportunities easier for others to reach.",
  },
  {
    label: "DIRECTION",
    title: "Technology for social good",
    body: "I want to combine embedded systems and software to create practical, equitable tools for real communities.",
  },
];

export const AboutSection = () => (
  <section id="about" className="archive-section about-intro">
    <PageContainer>
      <ArchiveHeader
        number="01"
        label="ABOUT / JASON GUTIERREZ"
        title="Engineering across the physical and digital."
        intro="A first-generation Stanford student connecting electrical engineering and computer science to build technology for social good."
      />

      <div className="about-hero-grid">
        <figure className="about-photo-card">
          <div className="about-photo-placeholder" role="img" aria-label="Placeholder for a portrait of Jason Gutierrez">
            <MetaLabel>PORTRAIT / COMING SOON</MetaLabel>
            <strong>JG</strong>
            <MetaLabel>DROP IMAGE HERE</MetaLabel>
          </div>
          <figcaption>JASON / STANFORD, CA / 2026</figcaption>
        </figure>

        <ContentCard as="div" className="about-story">
          <p className="about-lede">I was born and raised in Houston, Texas, and I&apos;m proudly shaped by my Guatemalan heritage.</p>
          <p>I&apos;m drawn to the intersection of computer science and electrical engineering—especially using embedded systems and thoughtful software to solve problems that matter. Education technology is deeply personal to me because access to learning transformed my own path.</p>

          <blockquote>Build technology that opens doors, not just technology that proves what is possible.</blockquote>

          <div className="about-actions">
            <ActionButton to="/projects">Explore my work <ArrowRight aria-hidden="true" /></ActionButton>
            <ActionButton to="/contact" variant="secondary"><FileText aria-hidden="true" /> Request résumé</ActionButton>
          </div>
        </ContentCard>
      </div>

      <div className="about-current" aria-labelledby="motivations-heading">
        <div className="about-current-heading">
          <MetaLabel as="p" id="motivations-heading">WHAT DRIVES ME</MetaLabel>
          <span>the thread through my work</span>
        </div>
        <div className="about-current-grid">
          {motivations.map((item) => (
            <ContentCard key={item.label}>
              <MetaLabel>{item.label}</MetaLabel>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </ContentCard>
          ))}
        </div>
      </div>

      <ContentCard as="div" className="about-north-star">
        <MetaLabel>THE LONG-TERM GOAL</MetaLabel>
        <p>Push the boundaries of technology while creating equitable resources that let anyone access a quality education, no matter where they begin or where they live.</p>
      </ContentCard>
    </PageContainer>
  </section>
);
