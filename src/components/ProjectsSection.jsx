/* eslint-disable react/prop-types */
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import medHelper from "../projectPics/medHelper.png";
import theremin from "../projectPics/theremin.jpg";
import signalButtons from "../projectPics/SignalButtons.JPG";
import bike from "../projectPics/bike-web.jpg";
import solderingVideo from "../projectPics/BikeSolderingVideo.m4v?url";

const projects = [
  {
    title: "MediHelper",
    meta: "REACT / GOOGLE CLOUD / GEMINI",
    description: "A healthcare accessibility application designed to make medical information easier to understand and act on.",
    media: [{ type: "image", src: medHelper, alt: "MediHelper application interface" }],
  },
  {
    title: "Light-Controlled Theremin",
    meta: "STM32L4 / ADC / DAC / C",
    description: "A real-time instrument translating photoresistor input through a 12-bit ADC pipeline into synthesized audio.",
    media: [{ type: "image", src: theremin, alt: "Light-controlled theremin prototype" }],
  },
  {
    title: "Smart Bike Light",
    meta: "STM32 / I²C / GYROSCOPE / C",
    description: "Embedded firmware for an automatic turn-signal system that detects motion and cancels signals after a turn.",
    media: [
      { type: "image", src: signalButtons, alt: "Smart bike light turn-signal buttons" },
      { type: "image", src: bike, alt: "Bike equipped with the smart light system" },
      { type: "video", src: solderingVideo, alt: "Soldering the smart bike light electronics" },
    ],
  },
];

const ProjectMedia = ({ project }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const hasMultipleSlides = project.media.length > 1;
  const currentMedia = project.media[activeSlide];

  const showSlide = (direction) => {
    setActiveSlide((current) => (
      current + direction + project.media.length
    ) % project.media.length);
  };

  return (
    <div className="project-media" aria-label={`${project.title} media gallery`}>
      <div className="project-media-frame">
        {currentMedia.type === "video" ? (
          <video
            key={currentMedia.src}
            src={currentMedia.src}
            controls
            playsInline
            preload="metadata"
            aria-label={currentMedia.alt}
          >
            Your browser does not support embedded video.
          </video>
        ) : (
          <img src={currentMedia.src} alt={currentMedia.alt} />
        )}

        {hasMultipleSlides && (
          <>
            <button className="project-slide-control project-slide-previous" onClick={() => showSlide(-1)} aria-label={`Previous ${project.title} slide`}>
              <ChevronLeft aria-hidden="true" />
            </button>
            <button className="project-slide-control project-slide-next" onClick={() => showSlide(1)} aria-label={`Next ${project.title} slide`}>
              <ChevronRight aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {hasMultipleSlides && (
        <div className="project-slide-status">
          <div className="project-slide-dots" aria-label="Choose media slide">
            {project.media.map((media, index) => (
              <button
                key={media.src}
                className={activeSlide === index ? "active" : ""}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show slide ${index + 1}: ${media.alt}`}
                aria-current={activeSlide === index ? "true" : undefined}
              />
            ))}
          </div>
          <span>{String(activeSlide + 1).padStart(2, "0")} / {String(project.media.length).padStart(2, "0")}</span>
        </div>
      )}
    </div>
  );
};

export const ProjectsSection = () => (
  <section id="projects" className="archive-section px-4 py-24">
    <div className="container max-w-5xl mx-auto">
      <div className="archive-entry project-heading"><p className="archive-number">05</p><div><p className="archive-label">SELECTED PROJECTS</p><h2>Built work</h2></div></div>
      <div className="project-list">
        {projects.map((project, index) => (
          <article key={project.title}>
            <div className="project-copy"><span>{String(index + 1).padStart(2, "0")}</span><h3>{project.title}</h3><p className="archive-meta">{project.meta}</p><p>{project.description}</p><a href="https://github.com/JasonG77" target="_blank" rel="noreferrer">VIEW PROJECT →</a></div>
            <ProjectMedia project={project} />
          </article>
        ))}
      </div>
    </div>
  </section>
);
