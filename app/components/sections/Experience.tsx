"use client";

import React from "react";

const experiences = [
  { company: "Google", role: "Frontend Developer", period: "Present",          location: "Mountain View, California" },
  { company: "Google", role: "Frontend Developer", period: "Jul 20 - Jan 2022", location: "Mountain View, California" },
  { company: "Google", role: "Frontend Developer", period: "Jul 20 - Jan 2022", location: "Mountain View, California" },
];

const GoogleG = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const Experience = () => (
  <section id="experience" className="h-full flex flex-col justify-center px-[10vw] py-16 overflow-y-auto">
    <div style={{ maxWidth: 760 }}>
      <div className="font-mono mb-8">
        <span style={{ color: "var(--accent)" }}>$ </span>
        <span style={{ color: "var(--text-muted)" }} className="text-sm tracking-wider">cat experience.log</span>
      </div>

      <div className="space-y-2">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="font-mono"
            style={{ borderLeft: "2px solid var(--border)", padding: "16px 20px", transition: "border-color 0.15s, background 0.15s" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderLeftColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderLeftColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <GoogleG />
                <div>
                  <div className="text-sm font-semibold tracking-wide" style={{ color: "var(--text)" }}>{exp.company}</div>
                  <div className="text-xs tracking-wider mt-0.5" style={{ color: "var(--accent)" }}>{exp.role}</div>
                </div>
              </div>
              <div className="text-right text-xs" style={{ color: "var(--text-dim)" }}>
                <div className="tracking-wider">{exp.period}</div>
                <div className="mt-0.5 tracking-wider">
                  <span style={{ color: "var(--accent-mid)" }}>⌖ </span>{exp.location}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="font-mono text-xs mt-6" style={{ color: "var(--text-faint)" }}>
        // {experiences.length} entries · placeholder data
      </div>
    </div>
  </section>
);

export default Experience;
