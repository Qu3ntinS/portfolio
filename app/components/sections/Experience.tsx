'use client';

import React from 'react';

const GoogleLogo = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const Experience = () => {
  const experiences = [
    {
      company: 'Google',
      role: 'Frontend Developer',
      period: 'Present',
      location: 'Mountain View, California',
    },
    {
      company: 'Google',
      role: 'Frontend Developer',
      period: 'Jul 20 - Jan 2022',
      location: 'Mountain View, California',
    },
    {
      company: 'Google',
      role: 'Frontend Developer',
      period: 'Jul 20 - Jan 2022',
      location: 'Mountain View, California',
    },
  ];

  return (
    <section id="experience" className="py-20 bg-background light:bg-background-light">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-text light:text-text-light text-3xl font-bold mb-10">
            Experience
          </h2>

          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="flex items-center bg-secondary light:bg-secondary-light rounded-xl px-6 py-4 transition-transform duration-200 hover:scale-[1.01]"
              >
                <div className="flex-shrink-0 mr-5">
                  <GoogleLogo />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-text light:text-text-light font-semibold">{exp.company}</p>
                  <p className="text-accent text-sm">{exp.role}</p>
                </div>

                <div className="text-right text-sm text-text light:text-text-light opacity-70 shrink-0">
                  <p>{exp.period}</p>
                  <p className="flex items-center justify-end gap-1 mt-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {exp.location}
                  </p>
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
