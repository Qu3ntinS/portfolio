"use client";

import React from "react";
import { useTheme } from "../context/ThemeContext";
import Particles from "./Particles";

const ParticleBackground: React.FC = () => {
  const { isDarkMode } = useTheme();

  // Define particle colors based on theme
  const particleColors = isDarkMode
    ? ["#ffffff", "#f0f0f0", "#e0e0e0"] // Light particles for dark mode
    : ["#333333", "#666666", "#999999"]; // Dark particles for light mode

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Particles
        particleColors={particleColors}
        particleCount={500}
        particleSpread={3}
        speed={0.1}
        particleBaseSize={40}
        moveParticlesOnHover={false}
        alphaParticles={true}
        disableRotation={true}
        sizeRandomness={0.1}
        cameraDistance={1}
        className="w-full h-full"
      />
    </div>
  );
};

export default ParticleBackground;
