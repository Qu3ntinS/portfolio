import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Experience Section */}
      <section className="bg-[#0A0A0A] min-h-screen">
        <div className="container mx-auto px-4 py-20">
          {/*<h2 className="text-4xl font-bold text-white">Experience</h2>*/}
        </div>
      </section>
    </div>
  );
}
