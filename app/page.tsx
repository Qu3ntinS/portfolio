"use client";

import React, { useState, useEffect } from "react";
import TerminalNav, { SectionId, NavSection } from "./components/TerminalNav";
import { playNav } from "./lib/sounds";
import Hero from "./components/Hero";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Preloader from "./components/Preloader";

const SECTIONS: NavSection[] = [
  { id: "home",       label: "home"       },
  { id: "experience", label: "experience" },
  { id: "skills",     label: "skills"     },
  { id: "projects",   label: "projects"   },
  { id: "about",      label: "about"      },
  { id: "contact",    label: "contact"    },
];

export default function Home() {
  const [loaded, setLoaded]     = useState(false);
  const [active, setActive]     = useState<SectionId>("home");
  const [fading, setFading]     = useState(false);
  const [pending, setPending]   = useState<SectionId | null>(null);

  const navigate = (section: SectionId) => {
    if (!loaded || section === active || fading) return;
    playNav();
    setFading(true);
    setPending(section);
  };

  useEffect(() => {
    if (!fading || !pending) return;
    const t = setTimeout(() => {
      setActive(pending);
      setPending(null);
      setFading(false);
    }, 240);
    return () => clearTimeout(t);
  }, [fading, pending]);

  // Keyboard navigation
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (!loaded) return;
      const idx = SECTIONS.findIndex(s => s.id === active);
      if (e.key === "ArrowDown" || e.key === "j")
        navigate(SECTIONS[Math.min(idx + 1, SECTIONS.length - 1)].id);
      if (e.key === "ArrowUp" || e.key === "k")
        navigate(SECTIONS[Math.max(idx - 1, 0)].id);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [active, fading, loaded]);

  const renderSection = () => {
    switch (active) {
      case "home":       return <Hero />;
      case "experience": return <Experience />;
      case "skills":     return <Skills />;
      case "projects":   return <Projects />;
      case "about":      return <About />;
      case "contact":    return <Contact />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden relative z-10">
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <TerminalNav active={active} onNavigate={navigate} sections={SECTIONS} locked={!loaded} />

      {/* Content pane */}
      <main
        className="flex-1 overflow-hidden relative"
        style={{
          opacity:    fading ? 0 : 1,
          filter:     fading ? "blur(6px)" : "blur(0px)",
          transition: "opacity 0.24s ease, filter 0.24s ease",
        }}
      >
        {loaded && (
          <>
            <div
              className="absolute bottom-0 left-0 right-0 z-10 px-6 py-2 hidden md:flex items-center justify-between font-mono text-[10px] tracking-wider"
              style={{
                borderTop: "1px solid var(--border-section)",
                color: "var(--text-faint)",
                background: "var(--status-bar-bg)",
              }}
            >
              <span>~/portfolio/<span style={{ color: "var(--accent-code)" }}>{active}</span></span>
              <span>↑↓ or j/k to navigate</span>
            </div>
            {renderSection()}
          </>
        )}
      </main>
    </div>
  );
}
