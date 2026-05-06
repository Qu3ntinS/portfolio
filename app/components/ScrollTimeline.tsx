"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";

const SECTION_IDS = ["experience", "skills", "projects", "about", "contact"];

const BG_R      = 14;
const DOT_R     = 5;
const X         = 22;
const HALF_CIRC = Math.PI * BG_R; // semicircle arc length ≈ 43.98
const ANIM_MS   = 380;

const ScrollTimeline = () => {
    const [dotYs, setDotYs]     = useState<number[]>([]);
    const [totalHeight, setTotal] = useState(0);
    const [leftPos, setLeftPos]  = useState<number | null>(null);
    const [scrollY, setScrollY]  = useState(0);
    const [winH, setWinH]        = useState(800);

    const prevReachedRef = useRef<boolean[]>([]);
    const lockingRef     = useRef(false);

    const compute = useCallback(() => {
        const ys = SECTION_IDS.map((id) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const h2 = el.querySelector("h2");
            const target = h2 ?? el;
            return (
                target.getBoundingClientRect().top +
                window.scrollY +
                target.clientHeight / 2
            );
        }).filter((y): y is number => y !== null);

        setDotYs(ys);
        setTotal(document.documentElement.scrollHeight);
        setWinH(window.innerHeight);

        const anchor = document.getElementById("timeline-anchor");
        if (anchor) {
            setLeftPos(anchor.getBoundingClientRect().left - 80);
        }
    }, []);

    useEffect(() => {
        const raf = requestAnimationFrame(() => {
            compute();
            setTimeout(compute, 600);
        });
        window.addEventListener("resize", compute);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", compute);
        };
    }, [compute]);

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Detect newly reached dots → lock scroll for animation duration
    useEffect(() => {
        if (dotYs.length === 0) return;

        if (prevReachedRef.current.length !== dotYs.length) {
            prevReachedRef.current = new Array(dotYs.length).fill(false);
        }

        const viewCenter = scrollY + winH / 2;
        let newlyReached = false;

        dotYs.forEach((y, i) => {
            const reached = viewCenter >= y;
            if (reached && !prevReachedRef.current[i]) newlyReached = true;
            prevReachedRef.current[i] = reached;
        });

        if (newlyReached && !lockingRef.current) {
            lockingRef.current = true;
            document.body.style.overflow = "hidden";
            setTimeout(() => {
                document.body.style.overflow = "";
                lockingRef.current = false;
            }, ANIM_MS + 50);
        }
    }, [scrollY, dotYs, winH]);

    if (dotYs.length < 2 || leftPos === null || leftPos < 0) return null;

    const viewCenter = scrollY + winH / 2;

    return (
        <div
            className="absolute hidden lg:block pointer-events-none z-30"
            style={{ left: leftPos, top: 0, width: 45, height: totalHeight }}
            aria-hidden="true"
        >
            <style>{`
                @keyframes draw-half {
                    from { stroke-dashoffset: ${HALF_CIRC}; }
                    to   { stroke-dashoffset: 0; }
                }
                .half-draw {
                    stroke-dasharray: ${HALF_CIRC};
                    animation: draw-half ${ANIM_MS}ms ease forwards;
                }
                .half-hidden {
                    stroke-dasharray: ${HALF_CIRC};
                    stroke-dashoffset: ${HALF_CIRC};
                }
            `}</style>

            <svg
                width="45"
                height={totalHeight}
                viewBox={`0 0 45 ${totalHeight}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {dotYs.map((y, i) => {
                    const nextY     = dotYs[i + 1];
                    const lineStart = y + BG_R;
                    const lineEnd   = nextY !== undefined ? nextY - BG_R : null;
                    const fillY2    = lineEnd !== null
                        ? Math.min(Math.max(viewCenter, lineStart), lineEnd)
                        : null;
                    const reached   = viewCenter >= y;

                    // Arc paths: both start at top (X, y-BG_R), end at bottom (X, y+BG_R)
                    const top    = `${X} ${y - BG_R}`;
                    const bottom = `${X} ${y + BG_R}`;
                    const rightArc = `M ${top} A ${BG_R} ${BG_R} 0 0 1 ${bottom}`; // clockwise
                    const leftArc  = `M ${top} A ${BG_R} ${BG_R} 0 0 0 ${bottom}`; // counter-clockwise

                    return (
                        <React.Fragment key={i}>
                            {lineEnd !== null && (
                                <>
                                    <line
                                        x1={X} y1={lineStart}
                                        x2={X} y2={lineEnd}
                                        stroke="#1a1a1a" strokeWidth={4}
                                    />
                                    {fillY2 !== null && fillY2 > lineStart && (
                                        <line
                                            x1={X} y1={lineStart}
                                            x2={X} y2={fillY2}
                                            stroke="#00AEFF" strokeWidth={4}
                                        />
                                    )}
                                </>
                            )}

                            {/* bg circle */}
                            <circle cx={X + 0.5} cy={y} r={BG_R} fill="#0F0F0F" />

                            {/* right half ring */}
                            <path
                                d={rightArc}
                                fill="none"
                                stroke="#00AEFF"
                                strokeWidth={2}
                                className={reached ? "half-draw" : "half-hidden"}
                            />
                            {/* left half ring */}
                            <path
                                d={leftArc}
                                fill="none"
                                stroke="#00AEFF"
                                strokeWidth={2}
                                className={reached ? "half-draw" : "half-hidden"}
                            />

                            {/* blue dot */}
                            <circle cx={X} cy={y} r={DOT_R} fill="#00AEFF" />
                        </React.Fragment>
                    );
                })}
            </svg>
        </div>
    );
};

export default ScrollTimeline;
