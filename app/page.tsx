import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Experience />
      <Skills />
      <Projects />
    </main>
  );
}
