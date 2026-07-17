import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

const destinations = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const notes = [261.63, 329.63, 392, 493.88, 392, 329.63, 293.66, 369.99];

const scrollToDestination = (href) => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelector(href)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
};

export const HeroSection = () => {
  const [selected, setSelected] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const stopAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    window.clearInterval(audio.timer);
    audio.context.close();
    audioRef.current = null;
  }, []);

  const startAudio = useCallback(() => {
    if (audioRef.current) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const master = context.createGain();
    master.gain.value = isMuted ? 0 : volume;
    master.connect(context.destination);
    let step = 0;

    const playNote = () => {
      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = step % 4 === 0 ? "triangle" : "square";
      oscillator.frequency.value = notes[step % notes.length];
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.09, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start(now);
      oscillator.stop(now + 0.3);
      step += 1;
    };

    playNote();
    const timer = window.setInterval(playNote, 320);
    audioRef.current = { context, master, timer };
  }, [isMuted, volume]);

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio();
      setIsPlaying(true);
    }
  }, [isPlaying, startAudio, stopAudio]);

  const changeSelection = useCallback((direction) => {
    setSelected((current) =>
      (current + direction + destinations.length) % destinations.length
    );
  }, []);

  const openSelection = useCallback(() => {
    scrollToDestination(destinations[selected].href);
  }, [selected]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.master.gain.value = isMuted ? 0 : volume;
  }, [isMuted, volume]);

  useEffect(() => () => stopAudio(), [stopAudio]);

  const handleKeyDown = (event) => {
    if (["ArrowRight", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      changeSelection(1);
    } else if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      changeSelection(-1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      openSelection();
    } else if (event.key === " ") {
      event.preventDefault();
      togglePlayback();
    }
  };

  return (
    <section id="hero" className="player-hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <header className="player-masthead">
        <a href="#hero" className="wordmark">JG<span>®</span></a>
        <p>PORTFOLIO PLAYER / 01</p>
        <p className="masthead-status">STANFORD, CA <span aria-hidden="true">●</span> AVAILABLE</p>
      </header>

      <div className="hero-copy">
        <p className="eyebrow">COMPUTER SCIENCE × ELECTRICAL ENGINEERING</p>
        <h1 id="hero-title">I build ideas<br />you can <em>touch.</em></h1>
        <p className="hero-intro">Jason Gutierrez is an engineer creating thoughtful hardware and software for social good.</p>
        <div className="track-strip">
          <div className="equalizer" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div><span>NOW PLAYING</span><strong>Original Loop No. 01</strong></div>
          <span className="track-time">00:{isPlaying ? "18" : "00"}</span>
        </div>
      </div>

      <div className="player-shell" onKeyDown={handleKeyDown}>
        <div className="player-topline"><span>JASON&apos;S iPORTFOLIO</span><span>{isPlaying ? "▶" : "Ⅱ"}</span></div>
        <div className="lcd-screen" aria-live="polite">
          <div className="lcd-header"><span>PORTFOLIO</span><span>{selected + 1}/4</span></div>
          <ul>
            {destinations.map((item, index) => (
              <li key={item.href} className={selected === index ? "active" : ""}>
                <button onClick={() => { setSelected(index); scrollToDestination(item.href); }}>
                  <span>{String(index + 1).padStart(2, "0")}</span>{item.label}<b>›</b>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="click-wheel" role="group" aria-label="Portfolio player controls">
          <button className="wheel-menu" onClick={() => changeSelection(-1)} aria-label="Previous portfolio item">MENU</button>
          <button className="wheel-prev" onClick={() => changeSelection(-1)} aria-label="Previous item"><SkipBack /></button>
          <button className="wheel-next" onClick={() => changeSelection(1)} aria-label="Next item"><SkipForward /></button>
          <button className="wheel-play" onClick={togglePlayback} aria-label={isPlaying ? "Pause music" : "Play music"}>{isPlaying ? <Pause /> : <Play />}</button>
          <button className="wheel-center" onClick={openSelection} aria-label={`Open ${destinations[selected].label}`} />
        </div>

        <div className="volume-row">
          <button onClick={() => setIsMuted((muted) => !muted)} aria-label={isMuted ? "Unmute" : "Mute"}>{isMuted ? <VolumeX /> : <Volume2 />}</button>
          <input aria-label="Volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} />
          <span>{isMuted ? "MUTE" : `${Math.round(volume * 100)}%`}</span>
        </div>
        <p className="keyboard-hint">ARROWS TO BROWSE · ENTER TO OPEN · SPACE TO PLAY</p>
      </div>

      <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><i /></a>
    </section>
  );
};
