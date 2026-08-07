/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ActionButton, ArchiveHeader, ContentCard, MetaLabel, PageContainer } from "./system/DesignSystem";
import medHelper from "../projectPics/medHelper.png";
import theremin from "../projectPics/theremin.jpg";
import signalButtons from "../projectPics/SignalButtons.JPG";
import bike from "../projectPics/bike.jpg";
import solderingVideo from "../projectPics/BikeSolderingVideo.m4v?url";

const projects = [
  {
    title: "MediHelper",
    meta: "REACT / GOOGLE CLOUD / OPENAI / VERCEL",
    description: "Healthcare and insurance systems are difficult to navigate when information is fragmented or overly technical. MediHelper uses an accessible React interface and cloud NLP to explain coverage, find providers, and coordinate appointments and transportation in one place.",
    media: [{ type: "image", src: medHelper, alt: "MediHelper application interface" }],
  },
  {
    title: "FPGA Music Synthesizer",
    meta: "FPGA / VERILOG HDL / RTL / VIVADO",
    description: "Rich, responsive audio is difficult to generate on resource-constrained digital hardware. This Verilog synthesizer produces multi-voice chords, harmonics, stereo panning, and sequenced songs through a timing-closed 100 MHz FPGA pipeline.",
    media: [{ type: "image", src: theremin, alt: "FPGA music synthesizer hardware prototype" }],
  },
  {
    title: "Smart Bike Light System",
    meta: "STM32 / I²C / ADC / PWM / UART / BLE / C",
    description: "Hand signals can be difficult for drivers to see, especially at night or during sudden braking. This STM32 system uses motion and ambient-light sensors to activate bright signals, detect braking, auto-cancel turns, and report status over BLE.",
    media: [
      { type: "video", src: solderingVideo, alt: "Soldering the smart bike light electronics" },
      { type: "image", src: signalButtons, alt: "Smart bike light turn-signal buttons" },
      { type: "image", src: bike, alt: "Bike equipped with the smart light system" },
    ],
  },
];

const ProjectMedia = ({ project }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ));
  const hasMultipleSlides = project.media.length > 1;
  const currentMedia = project.media[activeSlide];

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(motionPreference.matches);

    motionPreference.addEventListener("change", updateMotionPreference);
    return () => motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  const showSlide = (direction) => {
    setActiveSlide((current) => (
      current + direction + project.media.length
    ) % project.media.length);
  };

  return (
    <div className="project-media" aria-label={`${project.title} media gallery`}>
      <div className="project-media-frame">
        {currentMedia.type === "video" ? (
          <video key={currentMedia.src} src={currentMedia.src} autoPlay={!prefersReducedMotion} muted loop={!prefersReducedMotion} controls playsInline preload="metadata" aria-label={currentMedia.alt}>
            Your browser does not support embedded video.
          </video>
        ) : (
          <img src={currentMedia.src} alt={currentMedia.alt} />
        )}

        {hasMultipleSlides && (
          <>
            <button className="project-slide-control project-slide-previous" onClick={() => showSlide(-1)} aria-label={`Previous ${project.title} slide`}><ChevronLeft aria-hidden="true" /></button>
            <button className="project-slide-control project-slide-next" onClick={() => showSlide(1)} aria-label={`Next ${project.title} slide`}><ChevronRight aria-hidden="true" /></button>
          </>
        )}
      </div>

      {hasMultipleSlides && (
        <div className="project-slide-status">
          <div className="project-slide-dots" aria-label="Choose media slide">
            {project.media.map((media, index) => (
              <button key={media.src} className={activeSlide === index ? "active" : ""} onClick={() => setActiveSlide(index)} aria-label={`Show slide ${index + 1}: ${media.alt}`} aria-current={activeSlide === index ? "true" : undefined} />
            ))}
          </div>
          <span>{String(activeSlide + 1).padStart(2, "0")} / {String(project.media.length).padStart(2, "0")}</span>
        </div>
      )}
    </div>
  );
};

export const ProjectsSection = () => {
  return (
    <section id="projects" className="archive-section">
      <PageContainer>
        <ArchiveHeader
          number="05"
          label="SELECTED PROJECTS"
          title="Built work"
          intro="A focused set of projects showing how I use hardware and software to solve practical problems."
        />
        <div className="project-list">
          {projects.map((project, index) => (
            <ContentCard key={project.title} className="project-card">
              <div className="project-copy">
                <MetaLabel>{String(index + 1).padStart(2, "0")} / PROJECT</MetaLabel>
                <h3>{project.title}</h3>
                <MetaLabel as="p" className="project-meta">{project.meta}</MetaLabel>
                <p>{project.description}</p>
                <ActionButton href="https://github.com/JasonG77" target="_blank" rel="noreferrer" variant="secondary">View project <ArrowUpRight aria-hidden="true" /></ActionButton>
              </div>
              <ProjectMedia project={project} />
            </ContentCard>
          ))}
        </div>
      </PageContainer>
    </section>
  );
};
