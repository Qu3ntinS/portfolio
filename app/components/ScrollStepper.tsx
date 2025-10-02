"use client";

import { useEffect, useState } from "react";

interface Section {
  id: string;
  title: string;
}

interface ScrollStepperProps {
  sections: Section[];
}

export default function ScrollStepper({ sections }: ScrollStepperProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Update jede Sektion und ihre Linie
      sections.forEach((s, idx) => {
        const section = document.getElementById(s.id);
        const point = document.querySelector(`#point-${s.id}`) as HTMLElement;
        const line = document.querySelector(`#line-${s.id}`) as HTMLElement;

        if (section && point) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;

          // Berechne wie weit wir durch die Sektion gescrollt sind
          const scrolledIntoSection =
            scrollPosition + windowHeight / 2 - sectionTop;
          const progressInSection = Math.max(
            0,
            Math.min(100, (scrolledIntoSection / sectionHeight) * 100)
          );

          // Update Punkt-Farbe
          if (scrollPosition + windowHeight / 2 >= sectionTop) {
            point.classList.remove("bg-background", "border-gray-700");
            point.classList.add("bg-cyan-400", "border-cyan-400");

            // Update aktiven Step
            if (
              scrollPosition + windowHeight / 2 >= sectionTop &&
              scrollPosition + windowHeight / 2 < sectionBottom
            ) {
              setActiveStep(idx);
            }
          } else {
            point.classList.remove("bg-cyan-400", "border-cyan-400");
            point.classList.add("bg-background", "border-gray-700");
          }

          // Update Linie (wenn vorhanden - Contact hat keine Linie)
          if (line) {
            if (scrollPosition + windowHeight / 2 >= sectionBottom) {
              // Sektion komplett durchgescrollt - Linie 100%
              line.style.height = "100%";
            } else if (scrollPosition + windowHeight / 2 >= sectionTop) {
              // Innerhalb der Sektion - progressiver Fill
              line.style.height = `${progressInSection}%`;
            } else {
              // Noch nicht erreicht
              line.style.height = "0%";
            }
          }
        }
      });
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  return null; // Keine UI nötig, nur Scroll-Logik
}
