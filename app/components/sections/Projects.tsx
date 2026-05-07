"use client";

import React from "react";

const projects = [
  {
    name: "hobbyconnect",
    description: "A platform to plan and share hobbies with friends. Organize activities, share experiences, and stay connected.",
    stack: ["React", "Node.js", "MySQL", "Docker"],
    github: "#",
    demo: "#",
  },
  {
    name: "portfolio",
    description: "Personal portfolio built with Next.js and Tailwind CSS. Terminal-style SPA navigation, dark/light theme.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    github: "#",
    demo: "#",
  },
];

const Projects = () => (
  <section id="projects" className="h-full flex flex-col justify-center px-[10vw] py-16 overflow-y-auto">
    <div style={{ maxWidth: 760 }}>
      <div className="font-mono mb-8">
        <span style={{ color: "var(--accent)" }}>$ </span>
        <span style={{ color: "var(--text-muted)" }} className="text-sm tracking-wider">cat ./projects/*</span>
      </div>

      <div className="space-y-8">
        {projects.map((p, i) => (
          <div key={i} style={{ borderLeft: "2px solid var(--accent-light)", paddingLeft: 20 }}>
            <div className="font-mono text-xs mb-3 flex items-center gap-2" style={{ color: "var(--accent)" }}>
              <span>▶</span>
              <span className="tracking-widest">{p.name}.md</span>
              <span style={{ color: "var(--text-faint)" }}>{"─".repeat(Math.max(0, 40 - p.name.length))}</span>
            </div>

            <p className="font-mono text-sm mb-4 leading-relaxed" style={{ color: "var(--text-muted)", maxWidth: 520 }}>
              {p.description}
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1 font-mono text-xs" style={{ color: "var(--text-dim)" }}>
                <span>stack › </span>
                {p.stack.map((s, j) => (
                  <span key={j}>
                    <span style={{ color: "var(--code-str)" }}>{s}</span>
                    {j < p.stack.length - 1 && <span style={{ color: "var(--text-faint)" }}> · </span>}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 font-mono text-xs ml-auto">
                {[["./github", p.github], ["./demo", p.demo]].map(([label, href]) => (
                  <a
                    key={label} href={href}
                    className="px-3 py-1 transition-all duration-150"
                    style={{ border: "1px solid var(--accent-mid)", color: "var(--accent)" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)";
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-mid)";
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="font-mono text-xs mt-8" style={{ color: "var(--text-faint)" }}>
        // {projects.length} projects · placeholder data
      </div>
    </div>
  </section>
);

export default Projects;
