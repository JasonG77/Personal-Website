/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const entries = [
  {
    id: "academics",
    number: "02",
    label: "ACADEMICS",
    title: "Stanford University",
    meta: "ELECTRICAL ENGINEERING / QUESTBRIDGE MATCH SCHOLAR / CLASS OF 2028",
    body: "Coursework in Verilog-based digital systems, STM32 embedded programming, circuits, KiCad board design, and computer architecture is building the foundation I use to create dependable hardware-software systems.",
  },
  {
    id: "experience",
    number: "03",
    label: "ENGINEERING FOCUS",
    title: "From RTL to real-time systems",
    meta: "VERILOG / STM32 / KICAD / COMPUTER ARCHITECTURE",
    body: "I gravitate toward problems where physical constraints matter. Through projects, I turn that foundation into timing-closed RTL, sensor-driven firmware, accessible software, and tested prototypes.",
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
