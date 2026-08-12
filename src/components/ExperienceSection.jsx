/* eslint-disable react/prop-types */
import { ArchiveHeader, MetaLabel, PageContainer, SectionDivider } from "./system/DesignSystem";
import rezmeLogo from "../assets/logos/rezme-mark.svg";
import intelLogo from "../assets/logos/intel-mark.svg";
import funboticsLogo from "../assets/logos/funbotics-mark.svg";
import soleLogo from "../assets/logos/sole-mark.svg";

const professionalExperience = [
  {
    organization: "Rézme Inc.",
    role: "Software Engineer Intern",
    dates: "APR 2025 — SEP 2025",
    stack: "PYTHON / NODE.JS / REACT / MONGODB",
    logo: rezmeLogo,
    bullets: [
      "Built automated benchmarking and validation pipelines across 5+ LLM and Spanish-to-English translation frameworks, identifying cost-efficient deployment strategies that reduced projected annual operating expenses by $10K.",
      "Shipped 200+ commits across Agile sprints, reducing system errors by approximately 30% and supporting a successful San Diego launch that expanded job access for justice-impacted candidates.",
      "Optimized backend APIs and data-processing workflows, improving system efficiency by 25% while supporting 1,000+ active users and Gemini-powered financial automation.",
    ],
  },
  {
    organization: "Intel",
    role: "Software & GPU Validation Intern",
    dates: "JUN 2026 — SEP 2026",
    stack: "PYTHON / GPU VALIDATION / TEST AUTOMATION / GRAPHICS PIPELINE",
    logo: intelLogo,
    bullets: [
      "Developed Python automation for GPU validation workflows, standardizing thermal and performance testing while reducing repetitive manual execution across workload scenarios.",
      "Analyzed rendering behavior across the graphics pipeline, using performance and thermal data to evaluate gaming and AI graphics workloads.",
      "Built test-execution and result-aggregation tooling that improved reproducibility and made GPU performance comparisons clearer across test conditions.",
    ],
  },
];

const leadershipExperience = [
  {
    organization: "Stanford Funbotics",
    role: "STEM Educator",
    dates: "SEP 2024 — PRESENT",
    stack: "ARDUINO / 3D PRINTING / CAD / K–12 EDUCATION",
    logo: funboticsLogo,
    bullets: [
      "Collaborate with a volunteer team to deliver hands-on STEM education through a nonprofit serving K–12 students in East Palo Alto.",
      "Lead workshops in Arduino programming, 3D printing, and CAD that build technical confidence and curiosity in underrepresented communities.",
    ],
  },
  {
    organization: "Society of Latinx Engineers (SOLE / SHPE)",
    role: "Finance, Media Team Intern & LaIR Tutor",
    dates: "SEP 2024 — PRESENT",
    stack: "FINANCE / COMMUNITY / CS 106A TUTORING",
    logo: soleLogo,
    bullets: [
      "Manage a $30K+ organizational budget supporting professional development, technical programming, and community initiatives.",
      "Lead weekly 90-minute tutoring sessions for Stanford’s CS 106A course, teaching debugging strategies and structured problem solving.",
    ],
  },
];

const ExperienceEntry = ({ entry }) => (
  <article className="experience-entry">
    <div className="experience-logo-frame">
      <img src={entry.logo} alt={`${entry.organization} logo`} />
    </div>
    <div className="experience-entry-body">
      <div className="experience-entry-heading">
        <h3>{entry.role} <span>@ {entry.organization}</span></h3>
        <time>{entry.dates}</time>
      </div>
      <MetaLabel as="p" className="experience-stack">{entry.stack}</MetaLabel>
      <ul>
        {entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
      </ul>
    </div>
  </article>
);

const ExperienceGroup = ({ label, entries }) => (
  <div className="experience-group">
    <div className="experience-group-heading">
      <MetaLabel as="h3">{label}</MetaLabel>
      <span>{String(entries.length).padStart(2, "0")} ENTRIES</span>
    </div>
    <div className="experience-list">
      {entries.map((entry) => <ExperienceEntry key={entry.organization} entry={entry} />)}
    </div>
  </div>
);

export const ExperienceSection = () => (
  <section id="experience" className="archive-section experience-section">
    <PageContainer>
      <ArchiveHeader
        number="02"
        label="EXPERIENCE"
        title="Building systems that create opportunity."
        meta="SOFTWARE ENGINEERING / GPU VALIDATION / STEM EDUCATION"
        intro="Experience across production software, hardware validation, and technical education—grounded in measurable outcomes and useful work."
      />
      <ExperienceGroup label="PROFESSIONAL EXPERIENCE" entries={professionalExperience} />
      <SectionDivider className="experience-group-divider" />
      <ExperienceGroup label="LEADERSHIP & PROFESSIONAL DEVELOPMENT" entries={leadershipExperience} />
    </PageContainer>
  </section>
);
