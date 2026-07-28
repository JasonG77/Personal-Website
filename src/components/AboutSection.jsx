import { useEffect, useRef } from "react";

export const AboutSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.classList.contains("archive-entry")) {
            entry.target.style.animation = "none";
            setTimeout(() => {
              entry.target.style.animation = "";
            }, 10);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current.querySelector(".archive-entry")) {
      observer.observe(sectionRef.current.querySelector(".archive-entry"));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="archive-section px-4 py-24" ref={sectionRef}>
      <div className="container max-w-5xl mx-auto archive-entry">
        <p className="archive-number">01</p>
        <div>
          <p className="archive-label">ABOUT / JASON GUTIERREZ</p>
          <h2>Engineering across the physical and digital.</h2>
          <p className="archive-body">I&apos;m a first-generation Stanford student interested in embedded systems, FPGA design, digital hardware, validation, and the software that makes physical systems useful. I want to build careful, accessible technology that expands educational opportunity.</p>
          <span className="scribble-accent" aria-hidden="true">measure twice / build once</span>
        </div>
      </div>
    </section>
  );
};
