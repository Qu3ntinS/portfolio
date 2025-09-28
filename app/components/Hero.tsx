"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { useTheme } from "../context/ThemeContext";
import Wave from "react-wavify";

const Hero = () => {
  const { isDarkMode } = useTheme();
  const [waveOptions, setWaveOptions] = useState({
    height: 60,
    amplitude: 40,
    speed: 0.3,
    points: 4,
  });

  useEffect(() => {
    const updateWaveOptions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile
        setWaveOptions({
          height: 40,
          amplitude: 25,
          speed: 0.2,
          points: 3,
        });
      } else if (width < 1024) {
        // Tablet
        setWaveOptions({
          height: 50,
          amplitude: 35,
          speed: 0.25,
          points: 4,
        });
      } else {
        // Desktop
        setWaveOptions({
          height: 60,
          amplitude: 40,
          speed: 0.3,
          points: 4,
        });
      }
    };

    updateWaveOptions();
    window.addEventListener("resize", updateWaveOptions);
    return () => window.removeEventListener("resize", updateWaveOptions);
  }, []);

  return (
    <section className="relative h-[88vh] w-full bg-[#00AEFF] overflow-hidden">
      <div className="container mx-auto px-4 h-full">
        <div className="max-w-6xl mx-auto pt-40">
          {/* Content Box */}
          <div className="flex flex-col relative">
            {/* Avatar positioned absolutely */}
            <div className="hidden md:flex absolute top-0 -right-[1%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[450px] md:h-[450px] items-center justify-center">
              <Image
                src={
                  isDarkMode
                    ? "/portfolio/avatar-background-light.svg"
                    : "/portfolio/avatar-background.svg"
                }
                alt="Avatar Background"
                width={600}
                height={600}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%]"
              />
              <Image
                src="/portfolio/boy.svg"
                alt="Quentin's Avatar"
                width={300}
                height={300}
                priority
                className="relative z-10"
              />
            </div>

            {/* Text Content - Positioned relative to avatar */}
            <div className="text-white relative z-10 mt-16 sm:mt-20 md:mt-24">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                Hi, I'm Quentin.
              </h1>
              <div className="text-lg sm:text-xl h-[30px]">
                <TypeAnimation
                  sequence={[
                    "I'm very cool!",
                    1000,
                    "I'm a Full Stack Developer!",
                    1000,
                    "I love cars!",
                    1000,
                    "I'm passionate about coding!",
                    1000,
                    "Checkout the White Mode!",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="opacity-90"
                />
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex flex-row items-center md:justify-start justify-center gap-[10px] text-white mt-40 sm:mt-48 md:mt-24">
              <span className="text-sm sm:text-base">Scroll down</span>
              <div className="w-6 h-10 rounded-full border-2 border-white flex items-start p-[7px]">
                <div className="w-1.5 h-2 bg-white rounded-full mx-auto animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <Wave
          fill={isDarkMode ? "#ffffff" : "#000000"}
          paused={false}
          style={{
            display: "flex",
          }}
          options={waveOptions}
          className="w-full h-[150px] sm:h-[100px] md:h-[120px] lg:h-[150px]"
        />
      </div>
    </section>
  );
};

export default Hero;
