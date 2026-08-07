import { useEffect, useRef } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export const AboutSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

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

    if (sectionRef.current.querySelector(".about-shell")) {
      observer.observe(sectionRef.current.querySelector(".about-shell"));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="archive-section about-intro px-4 py-24" ref={sectionRef}>
      <div className="container max-w-5xl mx-auto about-shell">
        <div className="about-heading-row">
          <p className="archive-number">01</p>
          <p className="archive-label">ABOUT / JASON GUTIERREZ</p>
        </div>

        <div className="about-hero-grid">
          <figure className="about-photo-card">
            <div className="about-photo-placeholder" role="img" aria-label="Placeholder for a portrait of Jason Gutierrez">
              <span>PORTRAIT / COMING SOON</span>
              <strong>JG</strong>
              <small>DROP IMAGE HERE</small>
            </div>
            <figcaption>JASON / STANFORD, CA / 2026</figcaption>
          </figure>

          <div className="about-story">
            <h2>Engineering across the physical and digital.</h2>
            <p className="about-lede">I&apos;m Jason, a first-generation Stanford electrical engineering student and QuestBridge Match Scholar in the Class of 2028. I like working where hardware and software meet—where code has to account for timing, sensors, signals, and the physical world.</p>
            <p>My work spans embedded safety systems, FPGA audio design, and accessible healthcare software. Across each project, I care about careful validation, clear interfaces, and building technology that gives people more agency.</p>

            <blockquote>Measure carefully. Build with purpose. Make the result useful.</blockquote>

            <div className="about-actions">
              <Link className="about-cta about-cta-primary" to="/projects">Explore my work <ArrowRight aria-hidden="true" /></Link>
              <Link className="about-cta about-cta-secondary" to="/contact"><FileText aria-hidden="true" /> Request résumé</Link>
            </div>
          </div>
        </div>

        <div className="about-current" aria-labelledby="currently-heading">
          <div className="about-current-heading">
            <p id="currently-heading">CURRENTLY</p>
            <span>what I&apos;m focused on now</span>
          </div>
          <div className="about-current-grid">
            <article><span>BUILDING</span><h3>Useful physical systems</h3><p>Projects that connect sensing, computation, and real-world action.</p></article>
            <article><span>LEARNING</span><h3>Deeper hardware workflows</h3><p>FPGA design, RTL timing, embedded firmware, board-level design, and dependable validation.</p></article>
            <article><span>SEEKING</span><h3>An engineering team</h3><p>Opportunities in embedded systems, digital hardware, FPGA design, or hardware-software integration.</p></article>
          </div>
        </div>

        <div className="about-north-star">
          <span>WHY IT MATTERS</span>
          <p>As a first-generation QuestBridge Scholar, I care about widening access to education and making technical systems easier to understand and use. I stay grounded in community through the Society of Latinx Engineers, Hermanos de Stanford, Gamma Zeta Alpha, and Stanford Funbotics.</p>
        </div>
      </div>
    </section>
  );
};
