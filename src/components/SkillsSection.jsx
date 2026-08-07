import { ArchiveHeader, ContentCard, MetaLabel, PageContainer } from "./system/DesignSystem";

const groups = [
  ["DIGITAL HARDWARE", "FPGA design, Verilog, digital logic, validation"],
  ["EMBEDDED SYSTEMS", "STM32, C, ADC/DAC, I²C, sensors, firmware"],
  ["SOFTWARE", "React, JavaScript, Python, Git, web applications"],
];

export const SkillsSection = () => (
  <section id="skills" className="archive-section">
    <PageContainer>
      <ArchiveHeader
        number="04"
        label="TOOLS & PRACTICE"
        title="Technical range"
        intro="A hardware-first toolkit for taking ideas from digital logic and firmware through usable software."
      />
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
