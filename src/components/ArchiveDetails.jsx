/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const entries = [
  {
    id: "academics",
    number: "02",
    label: "ACADEMICS",
    title: "Stanford University",
    meta: "ELECTRICAL ENGINEERING / COMPUTER SYSTEMS",
    body: "Studying the path from digital logic and circuits to embedded software, with a focus on building dependable systems that connect computation to the physical world.",
  },
  {
    id: "experience",
    number: "03",
    label: "EXPERIENCE",
    title: "Hardware meets software",
    meta: "EMBEDDED SYSTEMS / VALIDATION / PRODUCT ENGINEERING",
    body: "Interested in roles where careful validation, firmware, and digital hardware come together. I approach engineering through measurement, iteration, and clear communication.",
  },
  {
    id: "aspirations",
    number: "06",
    label: "ASPIRATIONS",
    title: "Technology with wider access",
    meta: "EDUCATION / SOCIAL GOOD / EQUITABLE DESIGN",
    body: "My long-term goal is to expand access to high-quality learning by creating practical, affordable technology that works for communities too often left out of the design process.",
  },
];

const EntryList = ({ entriesToShow }) => {
  const entriesRef = useRef([]);

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

    entriesRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {entriesToShow.map((entry, index) => (
        <section
          key={entry.id}
          id={entry.id}
          className="archive-section px-4 py-24"
          ref={(el) => (entriesRef.current[index] = el)}
        >
          <div className="container max-w-5xl mx-auto archive-entry">
            <p className="archive-number">{entry.number}</p>
            <div>
              <p className="archive-label">{entry.label}</p>
              <h2>{entry.title}</h2>
              <p className="archive-meta">{entry.meta}</p>
              <p className="archive-body">{entry.body}</p>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export const AcademicExperience = () => <EntryList entriesToShow={entries.slice(0, 2)} />;
export const AspirationsSection = () => <EntryList entriesToShow={entries.slice(2)} />;
