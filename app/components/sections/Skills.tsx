"use client";

import React from "react";
import Image from "next/image";

const skills = [
  { name: "React Native", icon: "/portfolio/skills/react.svg" },
  { name: "React",        icon: "/portfolio/skills/react.svg" },
  { name: "Symfony",      icon: "/portfolio/skills/symfony.svg" },
  { name: "PHP",          icon: "/portfolio/skills/php.svg" },
  { name: "Vue.js",       icon: "/portfolio/skills/vue.svg" },
  { name: "AWS",          icon: "/portfolio/skills/aws.svg" },
  { name: "Bootstrap",    icon: "/portfolio/skills/bootstrap.svg" },
  { name: "CSS",          icon: "/portfolio/skills/css.svg" },
  { name: "Database",     icon: "/portfolio/skills/database.svg" },
  { name: "SASS",         icon: "/portfolio/skills/sass.svg" },
  { name: "Docker",       icon: "/portfolio/skills/docker.svg" },
  { name: "Figma",        icon: "/portfolio/skills/figma.svg" },
  { name: "Git",          icon: "/portfolio/skills/git.svg" },
  { name: "HTML5",        icon: "/portfolio/skills/html.svg" },
  { name: "Javascript",   icon: "/portfolio/skills/js.svg" },
  { name: "Linux",        icon: "/portfolio/skills/linux.svg" },
  { name: "Node.js",      icon: "/portfolio/skills/node.svg" },
];

const Skills = () => (
  <section id="skills" className="h-full flex flex-col justify-center px-[10vw] py-16 overflow-y-auto">
    <div style={{ maxWidth: 760 }}>
      <div className="font-mono mb-8">
        <span style={{ color: "var(--accent)" }}>$ </span>
        <span style={{ color: "var(--text-muted)" }} className="text-sm tracking-wider">ls -la ~/skills/</span>
      </div>

      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(115px, 1fr))" }}>
        {skills.map((skill, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 py-4 px-3 font-mono text-xs tracking-wider transition-all duration-150 cursor-default"
            style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
              (e.currentTarget as HTMLElement).style.color = "var(--text)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            <Image src={skill.icon} alt={skill.name} width={28} height={28} className="skill-icon-img" />
            <span style={{ fontSize: 10, textAlign: "center", lineHeight: 1.3 }}>{skill.name}</span>
          </div>
        ))}
      </div>

      <div className="font-mono text-xs mt-6" style={{ color: "var(--text-faint)" }}>
        // {skills.length} skills found
      </div>
    </div>
  </section>
);

export default Skills;
