"use client";

import React, { useEffect, useState } from "react";
import { unlockAudio } from "../lib/sounds";

const ASSETS = [
  "/portfolio/me.JPG",
  "/portfolio/skills/react.svg",
  "/portfolio/skills/symfony.svg",
  "/portfolio/skills/php.svg",
  "/portfolio/skills/vue.svg",
  "/portfolio/skills/aws.svg",
  "/portfolio/skills/bootstrap.svg",
  "/portfolio/skills/css.svg",
  "/portfolio/skills/database.svg",
  "/portfolio/skills/sass.svg",
  "/portfolio/skills/docker.svg",
  "/portfolio/skills/figma.svg",
  "/portfolio/skills/git.svg",
  "/portfolio/skills/html.svg",
  "/portfolio/skills/js.svg",
  "/portfolio/skills/linux.svg",
  "/portfolio/skills/node.svg",
];

const MIN_MS = 2000;

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    let completed = 0;
    const bump = () => {
      completed += 1;
      setProgress(completed / ASSETS.length);
    };
    const preload = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new window.Image();
        img.onload = img.onerror = () => {
          bump();
          resolve();
        };
        img.src = src;
      });

    Promise.all(ASSETS.map(preload)).finally(() => {
      setProgress(1);
      const remaining = Math.max(0, MIN_MS - (Date.now() - start));
      setTimeout(() => setReady(true), remaining);
    });
  }, []);

  const dismiss = async () => {
    if (!ready || exiting) return;
    await unlockAudio();
    setExiting(true);
    setTimeout(onDone, 800);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ready ? "Enter site" : "Loading"}
      className={`preloader-shell ${exiting ? "preloader-shell--exit" : ""}`}
      onPointerDown={e => {
        if (!ready || exiting) return;
        e.preventDefault();
        void dismiss();
      }}
      onKeyDown={e => {
        if (!ready || exiting) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          void dismiss();
        }
      }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        opacity: exiting ? 0 : 1,
        transition: exiting ? "opacity 0.75s cubic-bezier(0.45, 0, 0.55, 1)" : "none",
        pointerEvents: exiting ? "none" : "all",
        cursor: ready ? "pointer" : "progress",
        outline: "none",
      }}
    >
      <div className="preloader-shell__ambient" aria-hidden />
      <div className="preloader-shell__scanlines" aria-hidden />

      <div className="preloader-shell__content">
        <div className="preloader-terminal-chrome">
          <div className="preloader-terminal-title">portfolio — session</div>
          <div className="preloader-terminal-body">
            <p className="preloader-terminal-prompt">
              <span className="preloader-terminal-user">quentin@portfolio</span>
              <span className="preloader-terminal-at">:</span>
              <span className="preloader-terminal-path">~</span>
              <span className="preloader-terminal-dollar">$ </span>
              <span className="preloader-terminal-cmd">./init.sh --assets</span>
            </p>
            <p className={`preloader-terminal-status ${ready ? "preloader-terminal-status--ok" : ""}`}>
              {ready ? "ok — stdin ready (pointer or enter)" : "… prefetching static assets"}
            </p>

            <div className="preloader-loading" aria-hidden>
              <div className="preloader-loading-head">
                <span className="preloader-loading-label">load</span>
                <span className="preloader-loading-bracket">[</span>
                <span className="preloader-loading-track">
                  <span
                    className="preloader-loading-fill"
                    style={{ transform: `scaleX(${progress})` }}
                  />
                </span>
                <span className="preloader-loading-bracket">]</span>
                <span className="preloader-loading-cursor" />
              </div>
              <p className="preloader-loading-meta">
                {ready ? "checksum ok — buffers warm" : "resolving /public …"}
              </p>
            </div>

            <p className={`preloader-cta ${ready ? "preloader-cta--ready" : ""}`}>
              [ enter — continue ]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
