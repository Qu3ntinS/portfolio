"use client";

import React from "react";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/Hero";
import ScrollStepper from "./components/ScrollStepper";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";

const sections = [
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "about", title: "This is me" },
  { id: "contact", title: "Contact" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ScrollStepper sections={sections} />
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <About />
      <Contact />
    </div>
  );
}
