"use client";

import React, { useEffect } from "react";
import { playType, playPrompt } from "../lib/sounds";

const Hero = () => {
  useEffect(() => {
    // Match CSS animation delays exactly
    const cues: [number, () => void][] = [
      [100,  playPrompt],   // prompt line
      [1000, playType],     // code line 1
      [1150, playType],     // code line 2
      [1300, playType],     // code line 3
      [1450, playType],     // code line 4
      [1600, playType],     // code line 5
    ];
    const timers = cues.map(([delay, fn]) => setTimeout(fn, delay));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
  <section className="h-full flex flex-col justify-center px-[10vw] pb-12 pt-4 relative overflow-hidden">
    <style>{`
      @keyframes heroAppear { to { opacity: 1; } }
      @keyframes heroNameIn {
        from { opacity:0; transform:translateY(30px); filter:blur(8px); }
        to   { opacity:1; transform:translateY(0);    filter:blur(0);   }
      }
      @keyframes heroFadeUp {
        from { opacity:0; transform:translateY(16px); }
        to   { opacity:1; transform:translateY(0);    }
      }
      @keyframes heroCursor   { 0%,49%{opacity:0} 50%,100%{opacity:1} }
      @keyframes heroStatusBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }

      .h-prompt   { opacity:0; animation:heroAppear 0s 0.1s  forwards; }
      .h-greeting { opacity:0; animation:heroAppear 0s 0.4s  forwards; }
      .h-name     { opacity:0; animation:heroNameIn  0.9s 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
      .h-c1 { opacity:0; animation:heroAppear 0s 1.0s  forwards; }
      .h-c2 { opacity:0; animation:heroAppear 0s 1.15s forwards; }
      .h-c3 { opacity:0; animation:heroAppear 0s 1.3s  forwards; }
      .h-c4 { opacity:0; animation:heroAppear 0s 1.45s forwards; }
      .h-c5 { opacity:0; animation:heroAppear 0s 1.6s  forwards; }
      .h-cta    { opacity:0; animation:heroFadeUp 0.6s 1.9s cubic-bezier(0.16,1,0.3,1) forwards; }
      .h-cursor {
        display:inline-block; width:2px; height:1em;
        background:var(--accent); margin-left:2px;
        vertical-align:middle; opacity:0;
        animation:heroCursor 1s 1.8s infinite;
      }
      .h-dot {
        width:6px; height:6px; border-radius:50%;
        background:var(--status-green); flex-shrink:0;
        animation:heroStatusBlink 2s 2.5s infinite;
      }
      .h-btn {
        border:1px solid var(--accent);
        color:var(--accent);
        background:transparent;
        font-family:var(--font-mono),monospace;
        font-size:12px; letter-spacing:0.12em;
        text-transform:uppercase; padding:12px 24px;
        cursor:pointer; transition:background 0.15s, color 0.15s;
      }
      .h-btn:hover { background:var(--accent); color:var(--bg); }
    `}</style>


    <div style={{ maxWidth: 760, position: "relative", zIndex: 1 }}>
      <p className="h-prompt font-mono text-xs tracking-wider mb-8" style={{ color: "var(--accent-code)" }}>
        <span style={{ color: "var(--accent)" }}>~/portfolio </span>whoami<span className="h-cursor" />
      </p>

      <div className="mb-7">
        <span className="h-greeting font-mono block mb-2 tracking-widest"
          style={{ fontSize: "clamp(12px,1.3vw,14px)", color: "var(--text-dim)" }}>
          // Output:
        </span>
        <div className="h-name flex items-baseline" style={{
          fontFamily: "var(--font-inter),sans-serif",
          fontSize: "clamp(52px,7.5vw,108px)",
          fontWeight: 700,
          lineHeight: 0.92,
          letterSpacing: "-0.04em",
          gap: "0.14em",
        }}>
          <span style={{ color: "var(--text)" }}>Quentin</span>
          <span style={{ color: "transparent", WebkitTextStroke: "2px var(--accent)", fontStyle: "italic" }}>Thees</span>
        </div>
      </div>

      <div className="font-mono" style={{ fontSize: 13, lineHeight: 1.9, borderLeft: "2px solid var(--accent-light)", paddingLeft: 20 }}>
        <code className="h-c1 block whitespace-nowrap">
          <span style={{ color: "var(--accent)" }}>const</span> developer = {"{"}
        </code>
        <code className="h-c2 block whitespace-nowrap">
          &nbsp;&nbsp;age: <span style={{ color: "var(--code-num)" }}>18</span>,
          <span style={{ color: "var(--code-comment)", fontStyle: "italic" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// aus Deutschland</span>
        </code>
        <code className="h-c3 block whitespace-nowrap">
          &nbsp;&nbsp;role: <span style={{ color: "var(--code-str)" }}>&quot;Full Stack Developer&quot;</span>,
        </code>
        <code className="h-c4 block whitespace-nowrap">
          &nbsp;&nbsp;stack: [<span style={{ color: "var(--code-str)" }}>&quot;React&quot;</span>, <span style={{ color: "var(--code-str)" }}>&quot;Node&quot;</span>, <span style={{ color: "var(--code-str)" }}>&quot;Docker&quot;</span>],
        </code>
        <code className="h-c5 block whitespace-nowrap">{"}"};<span className="h-cursor" /></code>
      </div>

      <div className="h-cta flex items-center gap-8 mt-10">
        <button className="h-btn">./explore-projects</button>
        <div className="flex items-center gap-2 font-mono text-xs tracking-widest" style={{ color: "var(--text-muted)" }}>
          <span className="h-dot" />
          <span>Available for Work</span>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Hero;
