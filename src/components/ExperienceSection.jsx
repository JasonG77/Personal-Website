/* eslint-disable react/prop-types */
import { useState } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { MetaLabel, PageContainer, SectionDivider } from "./system/DesignSystem";
import rezmeLogo from "../assets/logos/rezme-mark.svg";
import intelLogo from "../assets/logos/intel-mark.svg";
import funboticsPhoto1 from "../assets/clubs/funbotics-1.jpg";
import shpePhoto1 from "../assets/clubs/shpe-1.jpg";
import shpePhoto2 from "../assets/clubs/shpe-2.jpg";
import folkloricoPhoto1 from "../assets/clubs/folklorico-1.jpg";
import folkloricoPhoto2 from "../assets/clubs/folklorico-2.jpg";
import gzaPhoto1 from "../assets/clubs/gza-1.jpg";

const professionalExperience = [
  {
    organization: "Intel",
    role: "Software & GPU Validation Intern",
    dates: "JUN 2026 — SEP 2026",
    stack: "PYTHON / GPU VALIDATION / TEST AUTOMATION / GRAPHICS PIPELINE",
    logo: intelLogo,
    bullets: [
      "Developed Python automation for GPU validation workflows, standardizing thermal and performance testing while reducing repetitive manual execution across workload scenarios.",
      "Analyzed rendering behavior across the graphics pipeline, using performance and thermal data to evaluate gaming and AI graphics workloads.",
      "Collected and analyzed GPU power/performance telemetry, including thermal, frequency, voltage, and Cdyn comparison data, while setting up lab thermal validation tooling to support repeatable workload characterization and graphics pipeline debug.",
    ],
  },
  {
    organization: "Rézme Inc.",
    role: "Software Engineer Intern",
    dates: "APR 2025 — SEP 2025",
    stack: "PYTHON / NODE.JS / REACT / MONGODB",
    logo: rezmeLogo,
    bullets: [
      "Built full-stack product features at Rézme using React, Node.js, APIs, and database-backed workflows, contributing 200+ production commits that improved reliability for 1,000+ active users and supported the company’s San Diego launch.",
      "Integrated AI/ML-powered workflows with Google Gemini and implemented i18next in React for Spanish-to-English translation support, improving multilingual access and automating manual processes across the platform.",
    ],
  },
];

const clubs = [
  {
    organization: "Stanford Funbotics",
    role: "STEM Educator",
    photos: [funboticsPhoto1],
  },
  {
    organization: "SHPE / SOLE",
    role: "Finance & Media Team Intern, LaIR Tutor",
    photos: [shpePhoto1, shpePhoto2],
  },
  {
    organization: "Ballet Folklorico",
    role: "Dancer",
    photos: [folkloricoPhoto1, folkloricoPhoto2],
  },
  {
    organization: "Gamma Zeta Alpha",
    role: "Professional Chair | Publicity",
    photos: [gzaPhoto1],
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

const ClubPhotos = ({ club }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const hasMultiplePhotos = club.photos.length > 1;
  const currentPhoto = club.photos[activeSlide];

  const showSlide = (direction) => {
    setActiveSlide((current) => (current + direction + club.photos.length) % club.photos.length);
  };

  return (
    <div className="club-photo-frame">
      {currentPhoto ? (
        <img src={currentPhoto} alt={`${club.organization} photo`} />
      ) : (
        <div className="club-photo-placeholder" aria-hidden="true"><ImageIcon /></div>
      )}

      {hasMultiplePhotos && (
        <>
          <button className="club-photo-control club-photo-previous" onClick={() => showSlide(-1)} aria-label={`Previous ${club.organization} photo`}><ChevronLeft aria-hidden="true" /></button>
          <button className="club-photo-control club-photo-next" onClick={() => showSlide(1)} aria-label={`Next ${club.organization} photo`}><ChevronRight aria-hidden="true" /></button>
          <span className="club-photo-count">{activeSlide + 1} / {club.photos.length}</span>
        </>
      )}
    </div>
  );
};

const ClubCard = ({ club }) => (
  <article className="club-card">
    <ClubPhotos club={club} />
    <h4>{club.organization}</h4>
    <p>{club.role}</p>
  </article>
);

const ClubGroup = ({ label, entries }) => (
  <div className="experience-group">
    <div className="experience-group-heading">
      <MetaLabel as="h3">{label}</MetaLabel>
      <span>{String(entries.length).padStart(2, "0")} ENTRIES</span>
    </div>
    <div className="club-grid">
      {entries.map((club) => <ClubCard key={club.organization} club={club} />)}
    </div>
  </div>
);

export const ExperienceSection = () => (
  <section id="experience" className="archive-section experience-section">
    <PageContainer>
      <ExperienceGroup label="PROFESSIONAL EXPERIENCE" entries={professionalExperience} />
      <SectionDivider className="experience-group-divider" />
      <ClubGroup label="LEADERSHIP & CLUBS" entries={clubs} />
    </PageContainer>
  </section>
);
