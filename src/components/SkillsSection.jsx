import { ArchiveHeader, ContentCard, MetaLabel, PageContainer } from "./system/DesignSystem";

const groups = [
  ["DIGITAL HARDWARE", "FPGA design, Verilog, digital logic, and timing-aware validation"],
  ["EMBEDDED SYSTEMS", "STM32, C, ADC/DAC, I²C, sensors, and real-time firmware"],
  ["SOFTWARE", "React, JavaScript, Python, Git, and accessible web applications"],
];

export const SkillsExperienceSection = () => (
  <section id="skills-experience" className="archive-section">
    <PageContainer>
      <ArchiveHeader
        number="02"
        label="SKILLS & EXPERIENCE"
        title="Technical range, grounded in practice"
        meta="ELECTRICAL ENGINEERING / COMPUTER SCIENCE / CLASS OF 2028"
        intro="At Stanford, I am learning how computation moves from digital logic and circuits into embedded code and usable software to impactful projects"
      />

      <ContentCard className="skills-experience-summary">
        <MetaLabel>STANFORD UNIVERSITY</MetaLabel>
        <div>
          <h3>Learning by building across the stack</h3>
          <p>My experience spans timing-closed RTL, sensor-driven firmware, board-level integration, and accessible React web products.</p>
        </div>
      </ContentCard>

      <div className="skill-card-grid">
        {groups.map(([title, detail]) => (
          <ContentCard key={title} className="skill-card">
            <MetaLabel>{title}</MetaLabel>
            <p>{detail}</p>
          </ContentCard>
        ))}
      </div>
    </PageContainer>
  </section>
);
