import { useCallback, useRef, useState } from "react";
import { CornerDownRight, SkipBack, SkipForward } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const archiveItems = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: "/contact" },
];

export const HeroSection = () => {
  const [screen, setScreen] = useState("intro");
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(null);
  const dragRef = useRef(null);
  const navigate = useNavigate();

  const moveSelection = useCallback((direction) => {
    setScreen("menu");
    setHovered(null);
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
            <strong>{screen === "intro" ? "WELCOME" : "ARCHIVE"}</strong>
            <span>▮▮▮</span>
          </div>
          {screen === "intro" ? (
            <div className="player-intro">
              <div className="player-intro-copy">
                <button onClick={() => setScreen("menu")}><span>ENTER ARCHIVE</span><b>›</b></button>
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
