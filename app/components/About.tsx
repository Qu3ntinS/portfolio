'use client';

import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <section id="about" className="py-20 bg-background light:bg-background-light">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-text light:text-text-light text-3xl font-bold mb-12">
            This is me
          </h2>

          <div className="flex flex-col md:flex-row items-start gap-10">
            {/* Photo - LEFT */}
            <div className="flex-shrink-0">
              <div className="w-44 h-52 rounded-2xl overflow-hidden">
                <Image
                  src="/portfolio/me.JPG"
                  alt="Quentin"
                  width={176}
                  height={208}
                  className="object-cover object-top w-full h-full"
                />
              </div>
            </div>

            {/* Text - RIGHT */}
            <div className="flex-1 pt-2">
              <h3 className="text-text light:text-text-light text-2xl font-bold mb-3">
                I'm Quentin
              </h3>
              <p className="text-text light:text-text-light opacity-80 leading-relaxed text-base">
                I'm 18 years and come from Germany. I am an IT specialist in
                application development. In my free time I program or play video
                games. If you want to get to know me better you can join my Discord
                or contact me via Email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
