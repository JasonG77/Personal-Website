import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { ActionButton, ArchiveHeader, ContentCard, PageContainer } from "./system/DesignSystem";
import portraitPhoto from "../assets/photos/jason-portrait.jpg";
import introVideo from "../assets/videos/jason-intro.mp4";
import introVideoPoster from "../assets/videos/jason-intro-poster.jpg";

const aboutMedia = [
  { type: "image", src: portraitPhoto, alt: "Portrait of Jason Gutierrez" },
  { type: "video", src: introVideo, poster: introVideoPoster, alt: "Video introduction of Jason Gutierrez" },
];

const PHOTO_DISPLAY_MS = 3000;

const AboutPhotoCard = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hasAutoAdvanced, setHasAutoAdvanced] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ));

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(motionPreference.matches);

    motionPreference.addEventListener("change", updateMotionPreference);
    return () => motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || activeSlide !== 0 || hasAutoAdvanced) return undefined;
    const timer = setTimeout(() => {
      setActiveSlide(1);
      setHasAutoAdvanced(true);
    }, PHOTO_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, [activeSlide, prefersReducedMotion, hasAutoAdvanced]);

  const showSlide = (direction) => {
    setActiveSlide((current) => (current + direction + aboutMedia.length) % aboutMedia.length);
  };

  const currentMedia = aboutMedia[activeSlide];

  return (
    <figure className="about-photo-card">
      <div className="about-photo-placeholder">
        {currentMedia.type === "image" ? (
          <img src={currentMedia.src} alt={currentMedia.alt} />
        ) : (
          <video key={currentMedia.src} src={currentMedia.src} poster={currentMedia.poster} loop={!prefersReducedMotion} controls playsInline preload="metadata" aria-label={currentMedia.alt}>
            Your browser does not support embedded video.
          </video>
        )}

        <button className="project-slide-control project-slide-previous" onClick={() => showSlide(-1)} aria-label="Show previous media"><ChevronLeft aria-hidden="true" /></button>
        <button className="project-slide-control project-slide-next" onClick={() => showSlide(1)} aria-label="Show next media"><ChevronRight aria-hidden="true" /></button>
      </div>

      <div className="project-slide-status about-photo-status">
        <div className="project-slide-dots" aria-label="Choose media">
          {aboutMedia.map((media, index) => (
            <button
              key={media.type}
              className={activeSlide === index ? "active" : ""}
              onClick={() => setActiveSlide(index)}
              aria-label={`Show ${media.type === "image" ? "photo" : "video"}`}
              aria-current={activeSlide === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>

      <figcaption>JASON / STANFORD, CA / 2026</figcaption>
    </figure>
  );
};

export const AboutSection = () => (
  <section id="about" className="archive-section about-intro">
    <PageContainer>
      <ArchiveHeader
        number="01"
        label="ABOUT / JASON GUTIERREZ"
      />

      <div className="about-hero-grid">
        <AboutPhotoCard />

        <ContentCard as="div" className="about-story">
          
          <p>I was born and raised in Houston, Texas, and I&apos;m proudly shaped by my Guatemalan heritage. I&apos;m drawn to the intersection of computer science and electrical engineering where I plan to work on embedded systems, semiconductors, and building software that will transform the education technology landscape</p>

          <blockquote>&ldquo;I plan to dedicate my life to building a future in which, through technology, every person on this planet has access to the best quality of education.&rdquo; - Luis vohn Ahn
          </blockquote>

          <div className="about-actions">
            <ActionButton to="/projects">Explore my work <ArrowRight aria-hidden="true" /></ActionButton>
            <ActionButton to="/contact" variant="secondary"><FileText aria-hidden="true" /> Request résumé</ActionButton>
          </div>
        </ContentCard>
      </div>
    </PageContainer>
  </section>
);
