import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { tracks } from "../data/tracks";

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
  const [mode, setMode] = useState("music");
  const [selected, setSelected] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.36);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const dragRef = useRef(null);

  const stopAudio = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.kind === "file") {
      audioRef.current.audio.pause();
      audioRef.current.audio.src = "";
    } else {
      window.clearInterval(audioRef.current.timer);
      audioRef.current.context.close();
    }
    audioRef.current = null;
  }, []);

  const startAudio = useCallback((index = trackIndex) => {
    if (audioRef.current) return;
    const track = tracks[index];
    if (track.src) {
      const audio = new Audio(track.src);
      audio.volume = isMuted ? 0 : volume;
      audio.addEventListener("timeupdate", () => {
        if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
      });
      audio.addEventListener("ended", () => setProgress(0));
      audio.play();
      audioRef.current = { kind: "file", audio };
      return;
    }
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
      oscillator.type = "triangle";
      oscillator.frequency.value = track.demoNotes[step % track.demoNotes.length];
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.11, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);
      oscillator.connect(gain); gain.connect(master);
      oscillator.start(now); oscillator.stop(now + 0.36);
      step += 1;
      setProgress((value) => (value + 4) % 101);
    };
    playNote();
    audioRef.current = { kind: "demo", context, master, timer: window.setInterval(playNote, 380) };
  }, [isMuted, trackIndex, volume]);

  const togglePlayback = useCallback(() => {
    if (isPlaying) { stopAudio(); setIsPlaying(false); }
    else { startAudio(); setIsPlaying(true); }
  }, [isPlaying, startAudio, stopAudio]);

  const changeTrack = useCallback((direction) => {
    const wasPlaying = Boolean(audioRef.current);
    const nextIndex = (trackIndex + direction + tracks.length) % tracks.length;
    stopAudio();
    setTrackIndex(nextIndex);
    setProgress(0);
    if (wasPlaying) window.setTimeout(() => startAudio(nextIndex), 0);
  }, [startAudio, stopAudio, trackIndex]);

  const moveSelection = useCallback((direction) => {
    if (mode === "music") changeTrack(direction);
    else setSelected((value) => (value + direction + archiveItems.length) % archiveItems.length);
  }, [changeTrack, mode]);

  const openSelection = useCallback(() => {
    if (mode === "music") togglePlayback();
    else scrollTo(archiveItems[selected].href);
  }, [mode, selected, togglePlayback]);

  const showPreviousScreen = useCallback(() => {
    setMode((value) => value === "music" ? "archive" : "music");
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (audioRef.current.kind === "file") audioRef.current.audio.volume = isMuted ? 0 : volume;
    else audioRef.current.master.gain.value = isMuted ? 0 : volume;
  }, [isMuted, volume]);
  useEffect(() => () => stopAudio(), [stopAudio]);

  const handleKeyDown = (event) => {
    if (["ArrowDown", "ArrowRight"].includes(event.key)) { event.preventDefault(); moveSelection(1); }
    else if (["ArrowUp", "ArrowLeft"].includes(event.key)) { event.preventDefault(); moveSelection(-1); }
    else if (event.key === "Enter") { event.preventDefault(); openSelection(); }
    else if (event.key === " ") { event.preventDefault(); togglePlayback(); }
    else if (event.key === "Escape") { event.preventDefault(); showPreviousScreen(); }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    moveSelection(event.deltaY > 0 ? 1 : -1);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current) return;
    const angle = Math.atan2(event.clientY - dragRef.current.y, event.clientX - dragRef.current.x);
    if (Math.abs(angle - dragRef.current.angle) > 0.32) {
      moveSelection(angle > dragRef.current.angle ? 1 : -1);
      dragRef.current.angle = angle;
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
          <div className="screen-status"><span>{isPlaying ? "Ⅱ" : "■"}</span><strong>{mode === "music" ? "MY SOUNDS" : "PERSONAL ARCHIVE"}</strong><span>▮▮▮</span></div>
          {mode === "music" ? (
            <div className="music-screen">
              <ul className="track-list">
                {tracks.map((track, index) => <li key={track.title} className={trackIndex === index ? "selected" : ""}><button onClick={() => { if (index !== trackIndex) changeTrack(index - trackIndex); }}>{track.title}<b>›</b></button></li>)}
              </ul>
              <div className="now-playing"><span>{isPlaying ? "▶" : "■"} {tracks[trackIndex].title} — {tracks[trackIndex].artist}</span><div className="screen-progress"><i style={{ width: `${progress}%` }} /></div></div>
            </div>
          ) : (
            <ul className="archive-list">
              {archiveItems.map((item, index) => (
                <li key={item.label} className={selected === index ? "selected" : ""}>
                  <button onClick={() => { setSelected(index); scrollTo(item.href); }}><span>{item.label}</span><b>›</b></button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="soft-wheel" role="group" aria-label="Music player controls"
          onPointerDown={(event) => { const rect = event.currentTarget.getBoundingClientRect(); dragRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, angle: Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2)) }; event.currentTarget.setPointerCapture(event.pointerId); }}
          onPointerMove={handlePointerMove} onPointerUp={() => { dragRef.current = null; }}>
          <button className="menu-control" onClick={showPreviousScreen} aria-label="Switch Music and Archive screens">MENU</button>
          <button className="previous-control" onClick={() => moveSelection(-1)} aria-label="Previous"><SkipBack /></button>
          <button className="next-control" onClick={() => moveSelection(1)} aria-label="Next"><SkipForward /></button>
          <button className="play-control" onClick={togglePlayback} aria-label={isPlaying ? "Pause original music" : "Play original music"}>{isPlaying ? <Pause /> : <Play />}</button>
          <button className="select-control" onClick={openSelection} aria-label={mode === "music" ? "Play selected track" : `Open ${archiveItems[selected].label}`} />
        </div>
        <div className="quiet-volume">
          <button onClick={() => setIsMuted((value) => !value)} aria-label={isMuted ? "Unmute" : "Mute"}>{isMuted ? <VolumeX /> : <Volume2 />}</button>
          <input type="range" min="0" max="1" step=".05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-label="Volume" />
        </div>
      </div>

      <button className="edge-link edge-about" onClick={() => scrollTo("#about")}>ABOUT</button>
      <button className="edge-link edge-enter" onClick={() => { setMode("archive"); setSelected(1); }}>ENTER</button>
      <nav className="sr-only" aria-label="Text portfolio navigation">
        {archiveItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
      </nav>
    </section>
  );
};
