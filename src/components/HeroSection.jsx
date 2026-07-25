import { useCallback, useRef, useState } from "react";
import { CornerDownRight, SkipBack, SkipForward } from "lucide-react";

const archiveItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "#contact" },
];

const scrollTo = (href) => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelector(href)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
};

export const HeroSection = () => {
  const [selected, setSelected] = useState(0);
  const dragRef = useRef(null);

  const moveSelection = useCallback((direction) => {
    setSelected((value) => (
      value + direction + archiveItems.length
    ) % archiveItems.length);
  }, []);

  const openSelection = useCallback(() => {
    scrollTo(archiveItems[selected].href);
  }, [selected]);

  const handleKeyDown = (event) => {
    if (["ArrowDown", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
      moveSelection(1);
    } else if (["ArrowUp", "ArrowLeft"].includes(event.key)) {
      event.preventDefault();
      moveSelection(-1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      openSelection();
    } else if (event.key === "Escape") {
      event.preventDefault();
      scrollTo("#hero");
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    moveSelection(event.deltaY > 0 ? 1 : -1);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current) return;
    const angle = Math.atan2(
      event.clientY - dragRef.current.y,
      event.clientX - dragRef.current.x
    );
    if (Math.abs(angle - dragRef.current.angle) > 0.32) {
      moveSelection(angle > dragRef.current.angle ? 1 : -1);
      dragRef.current.angle = angle;
    }
  };

  const handlePointerDown = (event) => {
    if (event.target.closest("button, input")) return;
    const rect = event.currentTarget.getBoundingClientRect();
    dragRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      angle: Math.atan2(
        event.clientY - (rect.top + rect.height / 2),
        event.clientX - (rect.left + rect.width / 2)
      ),
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerEnd = (event) => {
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section id="hero" className="minimal-hero" aria-labelledby="identity-title">
      <a className="personal-mark" href="#hero" aria-label="Jason Gutierrez home">JG</a>
      <div className="identity" id="identity-title">
        <strong>JASON GUTIERREZ</strong>
        <span>STANFORD ELECTRICAL ENGINEERING</span>
        <span>PERSONAL ARCHIVE / 2026</span>
        <em>hardware + software for social good</em>
      </div>
      <span className="tape-accent tape-one" aria-hidden="true" />
      <span className="sketch-note" aria-hidden="true">built by hand ↘</span>

      <div className="mp3-player" onKeyDown={handleKeyDown} onWheel={handleWheel}>
        <div className="player-screen" aria-live="polite">
          <div className="screen-status">
            <span>JG</span>
            <strong>PERSONAL ARCHIVE</strong>
            <span>▮▮▮</span>
          </div>
          <ul className="archive-list archive-list-full">
            {archiveItems.map((item, index) => (
              <li key={item.label} className={selected === index ? "selected" : ""}>
                <button onClick={() => {
                  setSelected(index);
                  scrollTo(item.href);
                }}>
                  <span>{item.label}</span><b>›</b>
                </button>
              </li>
            ))}
          </ul>
          <p className="screen-help">SCROLL WHEEL · SELECT TO OPEN</p>
        </div>

        <div
          className="soft-wheel"
          role="group"
          aria-label="Portfolio player controls"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        >
          <button className="menu-control" onClick={() => scrollTo("#hero")} aria-label="Return home">MENU</button>
          <button className="previous-control" onClick={() => moveSelection(-1)} aria-label="Previous archive item"><SkipBack /></button>
          <button className="next-control" onClick={() => moveSelection(1)} aria-label="Next archive item"><SkipForward /></button>
          <button className="play-control" onClick={openSelection} aria-label={`Open ${archiveItems[selected].label}`}><CornerDownRight /></button>
          <button className="select-control" onClick={openSelection} aria-label={`Open ${archiveItems[selected].label}`} />
        </div>
      </div>

      <button className="edge-link edge-about" onClick={() => scrollTo("#about")}>ABOUT</button>
      <button className="edge-link edge-enter" onClick={() => {
        setSelected(1);
        scrollTo("#projects");
      }}>ENTER</button>
      <nav className="sr-only" aria-label="Text portfolio navigation">
        {archiveItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
      </nav>
    </section>
  );
};
