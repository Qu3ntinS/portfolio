"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";
import { isMuted, toggleMute } from "../lib/sounds";

export type SectionId = "home" | "experience" | "skills" | "projects" | "about" | "contact";

export interface NavSection {
  id: SectionId;
  label: string;
}

interface Props {
  active: SectionId;
  onNavigate: (s: SectionId) => void;
  sections: NavSection[];
  /** When true, nav is visible but inert until intro finishes */
  locked?: boolean;
}

const TerminalNav = ({ active, onNavigate, sections, locked = false }: Props) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sfxMuted, setSfxMuted] = useState(() => (typeof window !== "undefined" ? isMuted() : false));

  const NavList = () => (
    <div className="flex flex-col gap-0.5 py-4 px-3">
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            disabled={locked}
            onClick={() => { if (locked) return; onNavigate(s.id); setMobileOpen(false); }}
            className="w-full text-left flex items-center gap-2 px-2 py-2 transition-all duration-150 font-mono text-xs tracking-wider"
            style={{
              color:      isActive ? "var(--accent)" : "var(--text-muted)",
              background: isActive ? "var(--bg-hover)" : "transparent",
              borderLeft: `2px solid ${isActive ? "var(--accent)" : "transparent"}`,
            }}
          >
            <span style={{ opacity: isActive ? 1 : 0, fontSize: 8 }}>▶</span>
            <span>{s.label}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <nav
        className="hidden md:flex flex-col w-[200px] flex-shrink-0 h-screen z-20 relative"
        style={{
          background: "var(--bg-surface)",
          borderRight: "1px solid var(--border)",
          opacity: locked ? 0.35 : 1,
          pointerEvents: locked ? "none" : "auto",
          transition: "opacity 0.5s ease",
        }}
      >
        <div className="px-4 pt-5 pb-4" style={{ borderBottom: "1px solid var(--border-section)" }}>
          <Image src="/portfolio/logo.svg" alt="Logo" width={32} height={32} className="mb-3 opacity-60" />
          <div className="font-mono text-[10px] tracking-widest" style={{ color: "var(--accent-code)" }}>
            ~/portfolio
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <NavList />
        </div>

        <div className="px-4 pb-5 pt-3" style={{ borderTop: "1px solid var(--border-section)" }}>
          <div className="font-mono text-[9px] tracking-wider mb-3" style={{ color: "var(--text-faint)" }}>
            ↑↓ navigate
          </div>
          <button
            onClick={toggleTheme}
            className="font-mono text-[10px] tracking-wider flex items-center gap-2 transition-opacity hover:opacity-80"
            style={{ color: "var(--accent-mid)" }}
          >
            <span>{isDarkMode ? "◐" : "◑"}</span>
            <span>{isDarkMode ? "light mode" : "dark mode"}</span>
          </button>
          <button
            onClick={() => setSfxMuted(toggleMute())}
            className="font-mono text-[10px] tracking-wider flex items-center gap-2 mt-2 transition-opacity hover:opacity-80"
            style={{ color: "var(--text-faint)" }}
          >
            <span>{sfxMuted ? "♪✕" : "♪"}</span>
            <span>{sfxMuted ? "sfx off" : "sfx on"}</span>
          </button>
          <div className="font-mono text-[9px] mt-3" style={{ color: "var(--text-faint)" }}>
            v1.0 · 2026
          </div>
        </div>
      </nav>

      {/* ── Mobile Top Bar ── */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3"
        style={{
          background: "var(--bg-surface)",
          borderBottom: "1px solid var(--border)",
          opacity: locked ? 0.35 : 1,
          pointerEvents: locked ? "none" : "auto",
          transition: "opacity 0.5s ease",
        }}
      >
        <div className="font-mono text-[10px] tracking-widest" style={{ color: "var(--accent-code)" }}>
          ~/portfolio/<span style={{ color: "var(--accent)" }}>{active}</span>
        </div>
        <button
          type="button"
          disabled={locked}
          onClick={() => { if (!locked) setMobileOpen(!mobileOpen); }}
          className="font-mono text-xs tracking-wider"
          style={{ color: "var(--accent-code)" }}
        >
          {mobileOpen ? "[close]" : "[menu]"}
        </button>
      </div>

      {/* ── Mobile Overlay ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-20 flex flex-col justify-center"
          style={{ background: "var(--bg)" }}
        >
          <div className="px-8">
            <div className="font-mono text-[10px] tracking-widest mb-6" style={{ color: "var(--accent-code)" }}>
              ~/portfolio
            </div>
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  type="button"
                  disabled={locked}
                  key={s.id}
                  onClick={() => { if (locked) return; onNavigate(s.id); setMobileOpen(false); }}
                  className="block w-full text-left font-mono text-xl py-3 tracking-wider transition-all"
                  style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }}
                >
                  {isActive ? "▶ " : "  "}{s.label}
                </button>
              );
            })}
            <button
              onClick={toggleTheme}
              className="font-mono text-xs tracking-wider mt-8 transition-opacity hover:opacity-80"
              style={{ color: "var(--accent-mid)" }}
            >
              {isDarkMode ? "◐ light mode" : "◑ dark mode"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TerminalNav;
