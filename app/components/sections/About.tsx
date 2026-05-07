"use client";

import React from "react";
import Image from "next/image";

const rows = [
  { key: "name",     val: "Quentin Thees" },
  { key: "age",      val: "18" },
  { key: "location", val: "Germany" },
  { key: "role",     val: "Full Stack Developer" },
  { key: "hobbies",  val: "coding · cars · gaming" },
];

const About = () => (
  <section id="about" className="h-full flex flex-col justify-center px-[10vw] py-16 overflow-y-auto">
    <div style={{ maxWidth: 760 }}>
      <div className="font-mono mb-8">
        <span style={{ color: "var(--accent)" }}>$ </span>
        <span style={{ color: "var(--text-muted)" }} className="text-sm tracking-wider">whoami --verbose</span>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="relative overflow-hidden" style={{
            width: 160, height: 190,
            border: "1px solid var(--accent-mid)",
            outline: "1px solid var(--accent-faint)",
            outlineOffset: 5,
          }}>
            <Image
              src="/portfolio/me.JPG"
              alt="Quentin"
              width={160}
              height={190}
              className="object-cover object-top w-[160px] h-[190px]"
              priority
            />
            <div style={{
              position: "absolute", bottom: 0, left: 0,
              width: 24, height: 24,
              borderBottom: "2px solid var(--accent)",
              borderLeft: "2px solid var(--accent)",
            }} />
          </div>
          <div className="font-mono text-[9px] mt-2 tracking-widest" style={{ color: "var(--accent-code)" }}>
            // profile.jpg
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="font-mono space-y-2 mb-6">
            {rows.map(({ key, val }) => (
              <div key={key} className="flex items-baseline gap-0" style={{ fontSize: 13 }}>
                <span style={{ color: "var(--accent-code)", minWidth: 90 }}>{key}</span>
                <span style={{ color: "var(--text-dim)", marginRight: 12 }}>│</span>
                <span style={{ color: key === "role" ? "var(--text)" : "var(--text-muted)" }}>{val}</span>
              </div>
            ))}
          </div>

          <div className="font-mono text-sm leading-relaxed" style={{
            color: "var(--text-muted)",
            borderLeft: "2px solid var(--accent-light)",
            paddingLeft: 16,
            maxWidth: 440,
          }}>
            I come from Germany — IT specialist in application development.
            In my free time I program or play video games.
            Want to talk?{" "}
            <span style={{ color: "var(--accent)" }}>join my Discord</span>{" "}
            or use the contact section.
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
