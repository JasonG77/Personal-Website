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
            <p className="about-lede">I&apos;m Jason, a first-generation Stanford student born and raised in Houston, Texas, and proudly shaped by my Guatemalan heritage.</p>
            <p>I&apos;m drawn to the intersection of computer science and electrical engineering—especially using embedded systems and thoughtful software to solve problems that matter. Education technology is deeply personal to me because access to learning transformed my own path.</p>

            <blockquote>Build technology that opens doors, not just technology that proves what is possible.</blockquote>

            <div className="about-actions">
              <Link className="about-cta about-cta-primary" to="/projects">Explore my work <ArrowRight aria-hidden="true" /></Link>
              <Link className="about-cta about-cta-secondary" to="/contact"><FileText aria-hidden="true" /> Request résumé</Link>
            </div>
          </div>
        </div>

        <div className="about-current" aria-labelledby="currently-heading">
          <div className="about-current-heading">
            <p id="currently-heading">WHAT DRIVES ME</p>
            <span>the thread through my work</span>
          </div>
          <div className="about-current-grid">
            <article><span>ROOTS</span><h3>Houston to Stanford</h3><p>My first-generation journey, my family&apos;s immigrant story, and my Guatemalan heritage shape who I build for and why access matters.</p></article>
            <article><span>MOTIVATION</span><h3>Education changes lives</h3><p>Learning opened doors in my life, so I want to help make those opportunities easier for others to reach.</p></article>
            <article><span>DIRECTION</span><h3>Technology for social good</h3><p>I want to combine embedded systems and software to create practical, equitable tools for real communities.</p></article>
          </div>
        </div>

        <div className="about-north-star">
          <span>THE LONG-TERM GOAL</span>
          <p>Push the boundaries of technology while creating equitable resources that let anyone access a quality education, no matter where they begin or where they live.</p>
        </div>
      </div>
    </section>
  );
};
