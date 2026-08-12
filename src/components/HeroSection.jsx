/* eslint-disable react/prop-types */
import { useCallback, useRef, useState } from "react";
import { CornerDownRight, SkipBack, SkipForward } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const archiveItems = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: "/contact" },
];

const companionNotes = ["Let’s meet Jason", "See what he built", "Send a message", "Get the details"];

const PenguinMascot = ({ compact = false, animated = false }) => (
  <svg
    className={`penguin-mascot${compact ? " penguin-mascot-compact" : ""}${animated ? " penguin-mascot-step" : ""}`}
    viewBox="0 0 120 132"
    role={compact ? undefined : "img"}
    aria-hidden={compact ? "true" : undefined}
    aria-label={compact ? undefined : "Byte, a small penguin wearing dark sunglasses and a gold chain"}
  >
    <g className="penguin-body">
      <path className="penguin-shadow" d="M27 121c10-7 55-7 66 0-10 8-56 8-66 0Z" />
      <path className="penguin-wing penguin-wing-left" d="M27 55C12 68 12 90 24 102c8-11 12-25 13-41Z" />
      <path className="penguin-wing penguin-wing-right" d="M93 55c15 13 15 35 3 47-8-11-12-25-13-41Z" />
      <path className="penguin-coat" d="M60 10c-25 0-38 21-38 54 0 34 14 57 38 57s38-23 38-57C98 31 85 10 60 10Z" />
      <path className="penguin-belly" d="M60 45c-18 0-27 17-27 42 0 21 11 34 27 34s27-13 27-34c0-25-9-42-27-42Z" />
      <path className="penguin-face" d="M60 20c-18 0-29 12-29 29 0 14 11 24 29 24s29-10 29-24c0-17-11-29-29-29Z" />
      <g className="penguin-eyes">
        <circle cx="49" cy="47" r="3.1" />
        <circle cx="71" cy="47" r="3.1" />
      </g>
      <path className="penguin-beak" d="m60 52 9 6-9 7-9-7 9-6Z" />
      <g className="penguin-glasses">
        <rect x="36" y="37" width="22" height="19" rx="6" />
        <rect x="62" y="37" width="22" height="19" rx="6" />
        <path d="M58 44h4M35 42l-7-3M85 42l7-3" />
        <path className="penguin-lens-shine" d="m41 42 6-2m22 2 6-2" />
      </g>
      <g className="penguin-chain">
        <path d="M42 70c5 10 13 15 18 15s13-5 18-15" />
        <circle cx="60" cy="86" r="5" />
        <path className="penguin-pendant-mark" d="m60 82 1.2 2.5 2.8.4-2 2  .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4Z" />
      </g>
      <path className="penguin-foot" d="M52 116c-10-2-20 2-24 8 8 5 20 4 29-1Z" />
      <path className="penguin-foot" d="M68 116c10-2 20 2 24 8-8 5-20 4-29-1Z" />
    </g>
  </svg>
);

export const HeroSection = () => {
  const [screen, setScreen] = useState("intro");
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [mascotStep, setMascotStep] = useState(0);
  const dragRef = useRef(null);
  const navigate = useNavigate();

  const moveSelection = useCallback((direction) => {
    setScreen("menu");
    setHovered(null);
    setMascotStep((value) => value + 1);
    setSelected((value) => (
      value + direction + archiveItems.length
    ) % archiveItems.length);
  }, []);

  const openSelection = useCallback(() => {
    if (screen === "intro") {
      setScreen("menu");
      return;
    }
    navigate(archiveItems[selected].href);
  }, [navigate, screen, selected]);

  const handleKeyDown = (event) => {
    if (["ArrowDown", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
      moveSelection(1);
    } else if (["ArrowUp", "ArrowLeft"].includes(event.key)) {
      event.preventDefault();
      moveSelection(-1);
    } else if (["Enter", " "].includes(event.key)) {
      event.preventDefault();
      openSelection();
    } else if (event.key === "Escape") {
      event.preventDefault();
      setScreen("intro");
      setHovered(null);
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
      <a className="personal-mark" href="#hero" aria-label="Jason Gutierrez home"></a>
      <div className="identity" id="identity-title">
        <strong>JASON GUTIERREZ</strong>
        <span>STANFORD ELECTRICAL ENGINEERING</span>
      </div>
      <div className="mp3-player" onKeyDown={handleKeyDown} onWheel={handleWheel}>
        <div className="player-screen" aria-live="polite">
          <div className="screen-status">
            <span>JG</span>
            <strong>{screen === "intro" ? "HELLO, WORLD" : "ARCHIVE"}</strong>
            <span>▮▮▮</span>
          </div>
          {screen === "intro" ? (
            <div className="player-intro">
              <div className="penguin-stage"><PenguinMascot /></div>
              <div className="player-intro-copy">
                <span>MEET BYTE</span>
                <h2>Hi, I’m Jason.</h2>
                <p>I build where hardware, software, and people meet.</p>
                <button onClick={() => setScreen("menu")}>ENTER ARCHIVE <b>›</b></button>
              </div>
            </div>
          ) : (
            <>
              <ul className="archive-list archive-list-full" onMouseLeave={() => setHovered(null)}>
                {archiveItems.map((item, index) => (
                  <li
                    key={item.label}
                    className={hovered === null && selected === index ? "selected" : ""}
                    onMouseEnter={() => setHovered(index)}
                  >
                    <button onClick={() => {
                      setSelected(index);
                      navigate(item.href);
                    }}>
                      <span>{item.label}</span><b>›</b>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="screen-companion">
                <PenguinMascot key={mascotStep} compact animated={mascotStep > 0} />
                <span>{companionNotes[hovered ?? selected]}</span>
              </div>
              <p className="screen-help">SCROLL · SELECT</p>
            </>
          )}
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
          <button className="menu-control" onClick={() => {
            setScreen("intro");
            setHovered(null);
          }} aria-label="Return to introduction">MENU</button>
          <button className="previous-control" onClick={() => moveSelection(-1)} aria-label="Previous archive item"><SkipBack /></button>
          <button className="next-control" onClick={() => moveSelection(1)} aria-label="Next archive item"><SkipForward /></button>
          <button className="play-control" onClick={openSelection} aria-label={screen === "intro" ? "Enter portfolio menu" : `Open ${archiveItems[selected].label}`}><CornerDownRight /></button>
          <button className="select-control" onClick={openSelection} aria-label={screen === "intro" ? "Enter portfolio menu" : `Open ${archiveItems[selected].label}`} />
        </div>
      </div>

      <button className="edge-link edge-about" onClick={() => navigate("/about")}>ABOUT</button>
      <button className="edge-link edge-enter" onClick={() => {
        setSelected(1);
        navigate("/projects");
      }}>ENTER</button>
      <nav className="sr-only" aria-label="Text portfolio navigation">
        {archiveItems.map((item) => <Link key={item.label} to={item.href}>{item.label}</Link>)}
      </nav>
    </section>
  );
};
