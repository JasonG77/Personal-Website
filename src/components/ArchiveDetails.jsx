/* eslint-disable react/prop-types */
import { ArchiveHeader, ContentCard, MetaLabel, PageContainer } from "./system/DesignSystem";

const focusCards = [
  {
    label: "SYSTEMS THINKING",
    title: "From RTL to real-time behavior",
    body: "I like tracing how a requirement moves through architecture, implementation, timing, sensing, and the final user experience.",
  },
  {
    label: "ENGINEERING PRACTICE",
    title: "Validation before polish",
    body: "Measurement, waveform inspection, filtering, and iterative testing help me turn prototypes into dependable systems.",
  },
];

const goalCards = [
  {
    label: "BUILDING NOW",
    title: "Hardware and software that respond to people",
    body: "I am exploring embedded devices, FPGA systems, and accessible applications that translate complex technology into useful action.",
  },
  {
    label: "LONG-TERM GOAL",
    title: "Education without geographic barriers",
    body: "I want to create practical, affordable tools that give more people access to high-quality learning, regardless of where they begin or live.",
  },
];

const DetailCards = ({ cards }) => (
  <div className="detail-card-grid">
    {cards.map((card) => (
      <ContentCard key={card.label} className="detail-card">
        <MetaLabel>{card.label}</MetaLabel>
        <h3>{card.title}</h3>
        <p>{card.body}</p>
      </ContentCard>
    ))}
  </div>
);

export const EngineeringFocusSection = () => (
  <section id="engineering-focus" className="archive-section">
    <PageContainer>
      <ArchiveHeader
        number="03"
        label="ENGINEERING FOCUS"
        title="Where hardware meets software"
        meta="VERILOG / STM32 / KICAD / COMPUTER ARCHITECTURE"
        intro="I gravitate toward problems where physical constraints matter and careful software can make a system more capable, dependable, and useful."
      />
      <DetailCards cards={focusCards} />
    </PageContainer>
  </section>
);

export const BuildingGoalsSection = () => (
  <section id="building-goals" className="archive-section">
    <PageContainer>
      <ArchiveHeader
        number="04"
        label="WHAT I’M BUILDING / GOALS"
        title="Technology with wider access"
        meta="EMBEDDED SYSTEMS / EDUCATION TECHNOLOGY / SOCIAL GOOD"
        intro="The thread through my work is using technical depth to reduce barriers—first through systems that solve immediate problems, and eventually through equitable education technology."
      />
      <DetailCards cards={goalCards} />
    </PageContainer>
  </section>
);
