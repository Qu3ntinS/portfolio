"use client";

import React from "react";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div id="timeline-anchor" className="h-0" />
        </div>
      </div>
      <Experience />
      <Skills />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
