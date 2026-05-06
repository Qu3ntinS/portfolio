'use client';

import React from 'react';
import Image from 'next/image';

const Experience = () => {
  const experiences = [
    {
      company: 'Google',
      role: 'Preferred Developer',
      period: 'Present',
      location: 'Mountain View, California'
    },
    {
      company: 'Google',
      role: 'Preferred Developer',
      period: 'Jul 01 - Jan 2022',
      location: 'Mountain View, California'
    },
    {
      company: 'Google',
      role: 'Preferred Developer',
      period: 'Jul 01 - Jan 2022',
      location: 'Mountain View, California'
    }
  ];

  return (
    <section id="experience" className="py-20 text-white relative bg-background light:bg-background-light mt-[193px]">
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-text light:text-text-light text-3xl font-bold mb-10">
            Experience
          </h2>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="flex flex-col md:flex-row bg-secondary light:bg-secondary-light rounded-lg p-6 transition-transform duration-300 hover:scale-[1.02]">
                <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                  <div className="flex-shrink-0">
                    <Image 
                      src="/portfolio/google-logo.svg" 
                      alt="Google Logo" 
                      width={40} 
                      height={40} 
                      className="rounded-full"
                    />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">{exp.company}</h3>
                  <p className="text-accent">{exp.role}</p>
                  <div className="flex flex-wrap items-center mt-2 text-sm">
                    <span className="mr-4 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {exp.period}
                    </span>
                    
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {exp.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 