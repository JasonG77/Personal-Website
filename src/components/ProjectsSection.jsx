import { useEffect, useRef } from "react";
import medHelper from "../projectPics/medHelper.png";
import theremin from "../projectPics/theremin.jpg";
import bikeLight from "../projectPics/bikr.jpg";

const projects = [
  { title: "MediHelper", meta: "REACT / GOOGLE CLOUD / GEMINI", description: "A healthcare accessibility application designed to make medical information easier to understand and act on.", image: medHelper },
  { title: "Light-Controlled Theremin", meta: "STM32L4 / ADC / DAC / C", description: "A real-time instrument translating photoresistor input through a 12-bit ADC pipeline into synthesized audio.", image: theremin },
  { title: "Smart Bike Light", meta: "STM32 / I²C / GYROSCOPE / C", description: "Embedded firmware for an automatic turn-signal system that detects motion and cancels signals after a turn.", image: bikeLight },
];

export const ProjectsSection = () => {
  const articlesRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = "none";
            setTimeout(() => {
              entry.target.style.animation = "";
            }, 10);
          }
        });
      },
      { threshold: 0.2 }
    );

    articlesRef.current.forEach((article) => {
      if (article) observer.observe(article);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="archive-section px-4 py-24">
      <div className="container max-w-5xl mx-auto">
        <div className="archive-entry project-heading"><p className="archive-number">05</p><div><p className="archive-label">SELECTED PROJECTS</p><h2>Built work</h2></div></div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article
              key={project.title}
              ref={(el) => (articlesRef.current[index] = el)}
              style={{ "--index": index }}
            >
              <div className="project-copy">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{project.title}</h3>
                <p className="archive-meta">{project.meta}</p>
                <p>{project.description}</p>
                <a href="https://github.com/JasonG77" target="_blank" rel="noreferrer">View Project</a>
              </div>
              <img src={project.image} alt={`Preview of ${project.title}`} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
