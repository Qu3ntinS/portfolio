import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* Anchor for ScrollTimeline left-position calculation */}
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
